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

import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'

import Icon from 'react-native-vector-icons/MaterialIcons'


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
  static navigationOptions = {
     tabBarLabel: 'Newsstand',
     tabBarIcon: () => (<Icon size={24} color="white" name="tv" />)
   }

  render() {

  return (
    <BottomNavigation
      labelColor="white"
      rippleColor="white"
      style={{ height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0 }}
      onTabChange={(newTabIndex) => alert(`New Tab at position ${newTabIndex}`)}
    >
      <Tab
        barBackgroundColor="#37474F"
        label="Movies & TV"
        icon={<Icon size={24} color="white" name="tv" />}
      />
      <Tab
        barBackgroundColor="#00796B"
        label="Music"
        icon={<Icon size={24} color="white" name="music-note" />}
      />
      <Tab
        barBackgroundColor="#5D4037"
        label="Books"
        icon={<Icon size={24} color="white" name="book" />}
      />
      <Tab
        barBackgroundColor="#3E2723"
        label="Newsstand"
        icon={<Icon size={24} color="white" name="newspaper" />}
      />
    </BottomNavigation>
  );
  }


}

module.exports = Anything;
