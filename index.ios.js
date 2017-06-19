/**
 * Travel Event App
 * https://github.com/facebook/react-native
 * @flow
 */

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
  StatusBar,
  TouchableOpacity,
  TouchableHighLight,
  Button,
} from 'react-native';

//This changes the header status icons (the battery and wifi) to white.
StatusBar.setBarStyle('light-content', true)

import { NavigationComponent } from 'react-native-material-bottom-navigation';

var ReactNative = require('react-native');

import { TabNavigator, StackNavigator } from 'react-navigation';

var SearchPage = require('./components/SearchPage');
var MainPage = require('./components/StacksOverTabs');
var MyList = require('./components/MyList');
var Calendar = require('./components/Calendar');
var Details = require('./components/Details');

import Ionicons from 'react-native-vector-icons/Ionicons';
import HeroText from './components/HeroText';
//import Icon from 'react-native-vector-icons/MaterialIcons'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  searchBar: {
    marginTop: 30,
    fontSize: 40,
    height: 50,
    flex: .1,
    borderWidth: 3,
    borderColor: 'red',
  },
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
  tabBarIcon: {
    width: 35,
    height: 35
  },

});


const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView>
    <HeroText>{banner}</HeroText>
    <Button
      onPress={() => navigation.navigate('Profile', { name: 'Jordan' })}
      title="Open profile screen"
    />
    <Button
      onPress={() => navigation.navigate('NotifSettings')}
      title="Open notifications screen"
    />
    <Button
      onPress={() => navigation.navigate('CalendarTab')}
      title="Go to calendar tab"
    />
    <Button onPress={() => navigation.goBack(null)} title="Go back" />
  </ScrollView>
);

const HomeScreen = ({ navigation }) => (
  <MyNavScreen banner="Home Screen" navigation={navigation} />
);

/*
const MyProfileScreen = ({ navigation }) => (
  <MyNavScreen
    banner={navigation.state.params.name}
    navigation={navigation}
  />
);
*/
const DetailsScreen = ({ navigation }) => (
  <Details
    activity={navigation.state.params.activity}
    navigation={navigation}
  />
);
const MyNotificationsSettingsScreen = ({ navigation }) => (
  <MyNavScreen banner="Notifications Screen" navigation={navigation} />
);

//Bottom Navigator
const TabNav = TabNavigator(
  {
    MainTab: {
      screen: HomeScreen,
      path: '/',
      navigationOptions: {
        title: 'Welcome',
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('./assets/navbar/home.png')}
            style={[styles.tabBarIcon, {tintColor: tintColor}]}
          />),
        headerStyle:{ backgroundColor: '#22264b'},
        headerTitleStyle:{ color: '#e8edf3'},
      },
    },
    ListTab: {
      screen: MyList,
      path: '/list',
      navigationOptions: {
        title: 'Things To Do',
        tabBarLabel: 'To-dos',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('./assets/navbar/list.png')}
            style={[styles.tabBarIcon, {tintColor: tintColor}]}
          />),
        headerStyle:{ backgroundColor: '#22264b'},
        headerTitleStyle:{ color: '#e8edf3'},
      },
    },
    CalendarTab: {
      screen: Calendar,
      path: '/calendar',
      navigationOptions: {
        title: 'Calendar',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('./assets/navbar/calendar.png')}
            style={[styles.tabBarIcon, {tintColor: tintColor}]}
          />),
        headerStyle:{ backgroundColor: '#22264b'},
        headerTitleStyle:{ color: '#e8edf3'},
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);

const TravelAppJapan = StackNavigator({
  Root: {
    screen: TabNav, //bottom navigator
  },
  NotifSettings: {
    screen: MyNotificationsSettingsScreen,
    navigationOptions: {
      title: 'Notifications',
      headerStyle: { backgroundColor: '#22264b'},
      headerTitleStyle:{ color: '#e8edf3'},
    },
  },
  Details: {
    screen: DetailsScreen,
    path: '/detail/:name',
    navigationOptions: ({ navigation }) => {
      title: navigation.state.params.name;
    },
    navigationOptions: {
      headerStyle: { backgroundColor: '#22264b'},
      headerTitleStyle: { color: '#e8edf3'},
      headerBackTitleStyle: { color: '#e8edf3' },
      headerTintColor: '#e8edf3',
    },
  },
});

AppRegistry.registerComponent('TravelAppJapan', () => TravelAppJapan);
