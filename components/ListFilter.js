
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

var ClickableList = require('./ClickableList');
var SimpleList = require('./SimpleList');
var SearchPage = require('./SearchPage');
var Login = require('./Login');
import { TabNavigator, StackNavigator } from 'react-navigation';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.active !== r2.active});

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

class ListFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows(this.props.fields),
      dataSource2: ds2.cloneWithRows(this.props.filters),
      filters: this.props.filters,
      fields: this.props.fields,
    };
  }
  componentDidMount() {
    this.state = {
      dataSource: ds.cloneWithRows(this.props.fields),
      dataSource2: ds2.cloneWithRows(this.props.filters),
      filters: this.props.filters,
      fields: this.props.fields,
    };
    this.searchAndFilter(this.state.filters, '')
  }
  renderFilter(filter) {
    var filterBar = (
        <TouchableOpacity onPress={this.handleFilterClick.bind(this, filter)}>
            <Text style={{fontSize: 24, backgroundColor:(filter.active)?'blue':'grey', margin:5}}>{filter.tag}</Text>
      </TouchableOpacity>
    );
    return filterBar;
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
    //k1 and k2 to be used by searchMatch function
    let k1 = this.props.searchedFields[0]
    let k2 = this.props.searchedFields[1]

    //Get filtered tags
    var selectedTags = [];

    filters.forEach((filter) => {
      if (filter.active) {
        selectedTags.push(filter.tag);
      }
    });

    const searchResults = this.state.fields.map(f => {
      var copyF = {...f};

      //Filter
      let intersectTags = f.tags.filter(t => selectedTags.contains(t))
      if(selectedTags.length!=0 && intersectTags.length!=0) {
        copyF.active = searchMatch(true)
        return copyF
      } else {
        copyF.active = searchMatch(false)
        return copyF
      }
      //Search
      function searchMatch(isActive) {

        //searchText is from the outer function. searchMatch is a closure.
        if (!searchText || searchText == '') {
          return isActive;
        } else if (copyF[k1].toLowerCase().indexOf(searchText.toLowerCase()) != -1) {
          return isActive;
        } else if (copyF[k2].toLowerCase().indexOf(searchText.toLowerCase()) != -1) {
          return isActive;
        } else {
          return false;
        }
        return false;
      }
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(searchResults),
    });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        { this.props.showFilterBar &&
          <Login
            filters={this.state.filters}
            modFilters={this.props.modFilters}
            handleFilterClick={this.handleFilterClick.bind(this)}
          />

/*
          <View style={{height: 40, backgroundColor: 'steelblue'}}>
            <ListView
              style={{flexDirection:'row', flex:1, flexWrap:'wrap'}}
              horizontal={true}
              removeClippedSubviews={false}
              dataSource={this.state.dataSource2}
              renderRow={this.renderFilter.bind(this)}
            />
          </View>
*/
        }
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

          { this.props.clickableList &&
            <ClickableList dataSource={this.state.dataSource} navigation={this.props.navigation}/>
          }

          { !this.props.clickableList &&
            <SimpleList dataSource={this.state.dataSource} navigation={this.props.navigation}/>
          }

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

module.exports = ListFilter;
