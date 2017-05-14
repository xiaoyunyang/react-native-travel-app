'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  WebView,
  Button,
  ListView
} from 'react-native';

import { fetch } from 'fetch';


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})


var styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      height: 24
   },
   headerContainer: {
      flex: 2 ,
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#ed3d6c",
      alignItems:"center",
      paddingRight: 5
   },
   leftHeaderContainer: {
      alignItems: "flex-start",
      flexDirection: "row"
   },
   rightHeaderContainer: {
      alignItems: "flex-end",
      flexDirection: "row"
   },
   contentContainer: {
      flex: 6,
   },
   logoText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      alignItems: "flex-start",
      marginLeft: 10
   },
   tabBar: {
     color: "blue",
     flexDirection: "row"
   }
  });


export default class ComponentOne extends Component {

  constructor(props) {
    super(props)
    this.state = {
      peopleDataSource: ds.cloneWithRows([]),
      loaded: false
    }
  }


  render() {
  return (
    <View style = {styles.mainContainer}>
    <View style={styles.contentContainer}>
        <ListView
          initialListSize={5}
          enableEmptySections={true}
          dataSource={this.state.peopleDataSource}
          renderRow={(person) => { return this.renderPersonRow(person) }} />
    </View>
    </View>
  );
}

renderPersonRow(person) {
  return (
    <Text> {person.first_name} </Text>
  )
}

componentDidMount() {
  fetch('https://gist.githubusercontent.com/yllongboy/81de024b02f1b668818066bcafbf3c4c/raw/5a508fd580cc1c3d104a300589e7e88d895fa766/whatsapp_contacts.json')
    .then(response => response.json())
    .then((data) => {
      this.setState({
        peopleDataSource: ds.cloneWithRows(data),
        loaded: true
      })
    });
}
}

module.exports = ComponentOne;
