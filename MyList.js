
import React, { Component } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  ScrollView,
  Navigator,
  TouchableOpacity,
  TouchableHighLight,
  Button,
} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';
var SearchPage = require('./SearchPage');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.active !== r2.active});

const FILTERS = [
  {
    tag: "eat",
    "active": false
  }
]
const FIELDS = [
  {
    title:"Tokyoo",
    subtitle: "Shinjuku",
    tags: [ "eat"],
    active: true,
  }
]

function intersect_safe(a, b)
{
  var ai=0, bi=0;
  var result = [];

  while( ai < a.length && bi < b.length )
  {
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }

  return result;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  searchBar: {
    marginTop: 30,
    fontSize: 40,
    height: 50,
    flex: .1,
    borderWidth: 3,
    borderColor: 'red',
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    flex: 0,
    backgroundColor: '#374046'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 50,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  navBar: {
    flexDirection: 'row',
    paddingTop: 30,
    height: 64,
    backgroundColor: '#1EAAF1'
  },
  tabBarIcon: {
    width: 35,
    height: 35
  },

});

class MyList extends Component {
  static navigationOptions = {
    title: "List",
    tabBarIcon: () => (
      <Image style={styles.tabBarIcon}
        source={require('./static/img/OscarTheGrouch.png')}
      />),
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      places: ds.cloneWithRows(['Kyoto', 'Tokyo', 'Osaka', 'Kyosan']),
      dataSource: ds.cloneWithRows(FIELDS),
      dataSource2: ds2.cloneWithRows(FILTERS),
      filters: FILTERS,
      fields: FIELDS,
      json: 'stuff',
      isLoading: true
    };
  }
  componentDidMount() {
    const test = true
    const dataUrl = 'https://facebook.github.io/react-native/movies.json'
    if(test) {
      let responseJson = require('./data/japan.json')
      this.setState({
        json: responseJson,
        dataSource: ds.cloneWithRows(responseJson.FIELDS),
        dataSource2: ds2.cloneWithRows(responseJson.FILTERS),
        filters: responseJson.FILTERS,
        fields: responseJson.FIELDS,
        isLoading: false,
      })
    }
    else {
      return fetch(dataUrl)
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             json: responseJson,
             dataSource: ds.cloneWithRows(responseJson.FIELDS),
             dataSource2: ds.cloneWithRows(responseJson.FILTERS),
             fields: responseJson.FIELDS,
             isLoading: false,
           })
         })
         .catch((error) => {
           console.error(error);
         });
     }
  }
  renderFilter(filter) {
    return (
        <TouchableOpacity onPress={this.handleFilterClick.bind(this, filter)}>
            <Text style={{fontSize: 24, backgroundColor:(filter.active)?'blue':'grey', margin:5}}>{filter.tag}</Text>
      </TouchableOpacity>
    );
  }
  renderField(field) {
    const {navigate} = this.props.navigation
    var fieldElement = <View style={{flexDirection:'column', borderWidth: 1, borderColor: 'steelblue', margin: 10}}>
      <Text style={{fontSize: 20}}>{field.title}</Text>
      <Text style={{fontSize: 14}}>{field.subtitle}</Text>
      {field.tags.map((tagField, i) => {
        return (
          <View key={i}>
            <Text style={{fontSize: 14, color: 'steelblue'}}>#{tagField}</Text>
              <Button title={"Details →"} onPress={ () => navigate("Details")}>
              </Button>
          </View>
        );
      })}
    </View>

    if (field.active) {
      return fieldElement;
    } else {
        return null;
    }
  }
  handleFilterClick(filter) {
    const newFilters = this.state.filters.map(f => {
      let copyF = {...f};
      if (copyF.tag === filter.tag) {
        copyF.active = !filter.active;
      }
      return copyF;
    });
    this.setState({
      filters: newFilters,
      dataSource2: this.state.dataSource2.cloneWithRows(newFilters)
    });
    this.searchAndFilter(newFilters, this.state.searchText);
  }
  handleSearchText(event) {
    let searchText = event.nativeEvent.text;
    this.setState({
      searchText,
    });
    this.searchAndFilter(this.state.filters, searchText);
  }
  searchAndFilter(filters, searchText) {
    //Get filtered tags
    var filteredTags = [];

    filters.forEach((filter) => {
      if (filter.active) {
        filteredTags.push(filter.tag);
      }
    });

    const searchResults = this.state.fields.map(f => {
      let copyF = {...f};

      //Filter
      if (filteredTags.length !== intersect_safe(filteredTags, copyF.tags).length) {
        copyF.active = false;
        return copyF;
      }

      //Search
      if (!searchText || searchText == '') {
        copyF.active = true;
      } else if (copyF.title.indexOf(searchText) != -1) {
        copyF.active = true;
      } else if (copyF.subtitle.indexOf(searchText) != -1) {
        copyF.active = true;
      } else {
        copyF.active = false;
      }
      return copyF;
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(searchResults),
    });
  }
  filterList = (newText) => {
    this.setState({text: newText})

  }
  render() {
    const {navigate} = this.props.navigation
    let pic = {uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}
    if(this.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 2, backgroundColor: 'steelblue'}} />
        <View style={{flex: 1, backgroundColor: 'powderblue', alignItems: 'center'}}>
          <TextInput
            style={{height: 40 , margin: 5}}
            placeholder="Search!"
            onChange={this.handleSearchText.bind(this)}
          />
        </View>
        <View style={{flex: 12, backgroundColor: 'skyblue'}}>
          <ListView
            style={{flexDirection:'row', flex:1, flexWrap:'wrap'}}
            horizontal={true}
            removeClippedSubviews={false}
            dataSource={this.state.dataSource2}
            renderRow={this.renderFilter.bind(this)}
          />
          <ListView
            removeClippedSubviews={false}
            dataSource={this.state.dataSource}
            renderRow={this.renderField.bind(this)}
          />
        </View>

        <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: 80, height: 10, backgroundColor: 'powderblue'}} />
          <View style={{width: 80, height: 10, backgroundColor: 'skyblue'}} />
          <View style={{width: 80, height: 10, backgroundColor: 'steelblue'}} />
        </View>
      </View>

    );
  }
}

const myList = StackNavigator({
  Main: {screen: MyList},
  Details: {screen: SearchPage}
})

module.exports = myList;
