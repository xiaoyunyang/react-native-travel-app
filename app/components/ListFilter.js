
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
var FilterBar = require('./FilterBar');
import { TabNavigator, StackNavigator } from 'react-navigation';
import isGuest from '../lib/isGuest';

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
      searchText: '',
    };
  }
  componentDidMount(){
    this.props.setFields(this.searchAndFilter(this.props.filters, ''))
  }
  handleSearchText(event) {
    let searchText = event.nativeEvent.text;
    this.setState({
      searchText,
    });
    this.props.setFields(this.searchAndFilter(this.props.filters, searchText));
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

    const searchResults = this.props.fields.map(f => {
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
    return searchResults;
  }
  filteredFields() {
    return this.searchAndFilter(this.props.filters, this.state.searchText)
  }
  setField(id) {
    let newFields = this.props.fields.map(f => {
      let newF = f
      if(f.id==id) {
        newF.completed = !newF.completed
      }
      return newF
    })
    this.props.setFields(newFields)
  }
  render() {

    let users = this.props.filters.map(u => {
      return u.tag
    })

    return (
      <View style={{flex: 1}}>
        { this.props.showFilterBar &&
          <FilterBar
            filters={this.props.filters}
            setFilters={this.props.setFilters}
            fields={this.props.fields}
            setFields={this.props.setFields}
            filterBarLabel={this.props.filterBarLabel}
          />
        }
        <View style={{flex: 3}}>
          <View style={styles.textBox}>
            <TextInput
              style={{height: 40 , margin: 0, color:'#22264b'}}
              placeholder="Search!"
              onChange={this.handleSearchText.bind(this)}
            />
          </View>
        </View>
        { !this.props.showFilterBar &&
          <View style={{marginTop: 15, alignItems: 'center'}}>
            <Text style={[styles.textNormal]}>
              Display Data for:  {this.props.filters.map(u =>
                 u.active ? '@'+ u.tag+ ' ' : '')}
            </Text>
          </View>
        }
        <View style={[styles.container, {flex: 20}]}>
          { this.props.clickableList &&
            <ClickableList
              dataSource={ds.cloneWithRows(this.props.fields)}
              setField={this.setField.bind(this)}
              isGuest={isGuest(users)}
              navigation={this.props.navigation}/>
          }

          { !this.props.clickableList &&
            <SimpleList dataSource={ds.cloneWithRows(this.props.fields)} navigation={this.props.navigation}/>
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
  textBox: {
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
