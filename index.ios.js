
'use strict'

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
  Navigator
} from 'react-native';


import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { AppRegistry } from 'react-native';
var ReactNative = require('react-native');

import { TabNavigator } from 'react-navigation';



var SearchPage = require('./SearchPage');
var MainPage = require('./MainPage');
var ListView = require('./ListView');
var Anything = require('./Anything');

import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'

import Icon from 'react-native-vector-icons/MaterialIcons'



var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    flex: 0,
    backgroundColor: '#374046'
  },
  flowRight: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'stretch'
},
buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
},
button: {
  height: 36,
  flex: 1,
  flexDirection: 'row',
  backgroundColor: '#48BBEC',
  borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 50,
  alignSelf: 'stretch',
  justifyContent: 'center'
},
searchInput: {
  height: 36,
  padding: 4,
  marginRight: 5,
  flex: 4,
  fontSize: 18,
  borderWidth: 1,
  borderColor: '#48BBEC',
  borderRadius: 8,
  color: '#48BBEC'
},
navBar: {
  flexDirection: 'row',
  paddingTop: 30,
  height: 64,
  backgroundColor: '#1EAAF1'
},
});


const JapanApp = TabNavigator({
  MainPage: { screen: MainPage },
  SearchPage: {screen: SearchPage},
  ListView: {screen: ListView},
  Anything: {screen: Anything},
},
);


ReactNative.AppRegistry.registerComponent('JapanApp', () => JapanApp);
