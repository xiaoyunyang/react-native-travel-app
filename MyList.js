
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


Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}

var ActivityList = require('./ActivityList');
import { TabNavigator, StackNavigator } from 'react-navigation';
var SearchPage = require('./SearchPage');

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.active !== r2.active});

const FILTERS = [
  {
    tag: "Filter",
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



class MyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      activitiesDisp: ds.cloneWithRows(FIELDS),
      dataSource2: ds2.cloneWithRows(FILTERS),
      filters: FILTERS,
      activities: FIELDS,
      json: 'stuff',
      isLoading: true
    };
  }
  setStates(responseJson) {
    let sortedActivities = responseJson.FIELDS.sort((a,b) => new Date(a.date) - new Date(b.date))
    this.setState({
      json: responseJson,
      activitiesDisp: ds.cloneWithRows(sortedActivities),
      dataSource2: ds.cloneWithRows(responseJson.FILTERS),
      filters: responseJson.FILTERS,
      activities: sortedActivities,
      isLoading: false,
    })
  }
  componentDidMount() {
    const test = true
    const dataUrl = 'https://facebook.github.io/react-native/movies.json'

    if(test) {
      let responseJson = require('./data/japan.json')
      this.setStates(responseJson)
    }
    else {
      return fetch(dataUrl)
         .then((response) => response.json())
         .then((responseJson) => {
           this.setStates(responseJson)
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
    var selectedTags = [];

    filters.forEach((filter) => {
      if (filter.active) {
        selectedTags.push(filter.tag);
      }
    });

    const searchResults = this.state.activities.map(f => {
      var copyF = {...f};

      //Filter
      let intersectTags = f.tags.filter(t => selectedTags.contains(t))
      if(selectedTags.length!=0 && intersectTags.length!=0) {
        copyF.active = true
      } else {
        copyF.active = false
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
      activitiesDisp: this.state.activitiesDisp.cloneWithRows(searchResults),
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
        <View style={{height: 40, backgroundColor: 'steelblue'}}>
          <ListView
            style={{flexDirection:'row', flex:1, flexWrap:'wrap'}}
            horizontal={true}
            removeClippedSubviews={false}
            dataSource={this.state.dataSource2}
            renderRow={this.renderFilter.bind(this)}
          />
        </View>
        <View style={{flex: 2}}>
          <View style={styles.searchBox}>
            <TextInput
              style={{height: 40 , margin: 0, color:'#22264b'}}
              placeholder="Search!"
              onChange={this.handleSearchText.bind(this)}
            />
          </View>
        </View>
        <View style={[styles.container, {flex: 20}]}>
          <ActivityList dataSource={this.state.activitiesDisp} navigation={this.props.navigation}/>
        </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  containerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8edf3'
  },
  searchBox: {
    backgroundColor: 'white',
    paddingLeft: 8,
    margin: 8
  },
  container: {
    backgroundColor: '#e8edf3',
    padding: 8
  },
  textNormal: {
    color: '#22264b',
    fontWeight: 'bold',
    fontSize: 12
  },
  textLarge: {
    color: '#22264b',
    fontWeight: 'bold',
    fontSize: 22
  }
})

module.exports = MyList;
