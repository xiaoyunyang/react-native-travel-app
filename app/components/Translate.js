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

/* TODO
 * Add-on: click to access audio. Use this for source of audio:
 * http://japanese-phrases.sakura.ne.jp/
 */
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
class Translate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: 'stuff',
      fields: FIELDS,
      filters: FILTERS,
      isLoading: true
    };
  }
  setStates(responseJson) {
    this.setState({
      json: responseJson,
      fields: responseJson.FIELDS,
      filters: responseJson.FILTERS,
      isLoading: false,
    })
   this.props.setFields(responseJson.FIELDS);
  }
  componentDidMount() {
    const test = true
    const dataUrl = 'https://facebook.github.io/react-native/movies.json'

    if(test) {
      let responseJson = require('../../data/translate.json')
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
        searchedFields={["en", "jp"]}
        showFilterBar={true}
        clickableList={false}
        filterBarLabel={"Categories"}
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
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
})

module.exports = Translate;
