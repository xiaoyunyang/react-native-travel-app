
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
  Navigator,
  TouchableOpacity,
  TouchableHighLight,
  Button,
} from 'react-native';

var ListFilter = require('./ListFilter');
import { TabNavigator, StackNavigator } from 'react-navigation';

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}

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
class TodoList extends Component {
  render() {
    let travelers = this.props.filters.map(f => f.tag)
    let noTravelers = travelers.reduce((a,b) => a+b) == ""
    if(noTravelers) {
      return <Text style={[{padding: 40}, styles.textLarge]}>❗Need to enter at least one traveler for the trip. Go to the Info tab.</Text>
    }
    if(this.props.travelDates.length < 4) {
      return <Text style={[{padding: 40}, styles.textLarge]}>❗Need to enter travel dates from the Info tab.</Text>
    }
    return (
      <ListFilter
        fields={this.props.fields}
        setFields={this.props.setFields}
        filters={this.props.filters}
        setFilters={this.props.setFilters}
        navigation={this.props.navigation}
        searchedFields={["title", "subtitle"]}
        showFilterBar={false}
        clickableList={true}
      />
    );
  }
}
const styles = StyleSheet.create({
  containerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8edf3'
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
module.exports = TodoList;
