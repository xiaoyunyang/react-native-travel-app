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
  Button
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

var styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      backgroundColor: "white",
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
      color: "black",
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


class Anything extends Component {


  render() {

  return (
  <View style={styles.mainContainer}>
    <Text style = {styles.logoText}>
      Put any component you want here.
   </Text>
  </View>
  );
  }


}

module.exports = Anything;
