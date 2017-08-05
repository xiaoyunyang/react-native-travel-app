
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
      return <Text>Need to enter at least one traveler for the trip. Go to the Home tab.</Text>
    }
    if(this.props.travelDates.length < 4) {
      return <Text>Need to enter travel dates from the Home tab.</Text>
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

module.exports = TodoList;
