
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
  constructor(props) {
    super(props);
    this.state = {
      activities: FIELDS,
      json: 'stuff',
      isLoading: true
    };
  }
  setStates(responseJson) {
    let sortedActivities = responseJson.FIELDS.sort((a,b) => new Date(a.date) - new Date(b.date))
    this.setState({
      json: responseJson,
      activities: sortedActivities,
      isLoading: false,
    })
   this.props.setFields(sortedActivities);
  }
  componentDidMount() {
    const test = true
    const dataUrl = 'https://facebook.github.io/react-native/movies.json'

    if(test) {
      let responseJson = require('../../data/japan.json')
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
  render() {
    if(this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
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
