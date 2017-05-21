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
      backgroundColor: 'white',
      height: 24
   },
   headerContainer: {
      flex: 1 ,
      flexDirection: "row",
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
     flexDirection: "row",
     flex: 1,
     borderRadius: 30

   }
  });


class MainPage extends Component {

  static navigationOptions = {
    title: 'Welcome',
  };

  render() {

    const { navigate } = this.props.navigation;

  return (
  <View style={styles.mainContainer}>
   <View style={styles.headerContainer}>
   <TouchableHighlight style = {styles.tabBar} onPress = { () => navigate('ListView')}>
    <Text style = {styles.logoText}>
      List View
   </Text>
   </TouchableHighlight>
   <TouchableHighlight style = {styles.tabBar} onPress = { () => navigate('SearchPage')} >
    <Text style = {styles.logoText}>
      Bamboo Forrest
   </Text>
   </TouchableHighlight>
   <TouchableHighlight style = {styles.tabBar} onPress = { () => navigate('Anything')}>
    <Text style = {styles.logoText}>
      Anything
   </Text>
   </TouchableHighlight>
  </View>
   <View style={styles.contentContainer}>
   </View>
  </View>
  );
  }


}

module.exports = MainPage;
