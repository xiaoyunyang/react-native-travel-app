import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'

import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  StatusBar,
  ListView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { TabNavigator, StackNavigator } from 'react-navigation';

var TodoList = require('../components/TodoList');
var Calendar = require('../components/Calendar');
var Translate = require('../components/Translate');
var Details = require('../components/Details');
var Login = require('../components/Login');
var FilterBar = require('../components/FilterBar');
var HeroText = require('../components/HeroText');

import Ionicons from 'react-native-vector-icons/Ionicons';


//This changes the header status icons (the battery and wifi) to white.
StatusBar.setBarStyle('light-content', true)

const HomeScreen = ({ navigation, screenProps }) => (
  <ScrollView>
    <HeroText>Enter Info to Customize Your Trip:</HeroText>
    <Button
      onPress={() => navigation.navigate('LoginSetting')}
      title="Enter Travelers"
      />
    <FilterBar
      filters={screenProps.activeUsers}
      setFilters={screenProps.setActiveUsers}
      fields={screenProps.userFilteredTodos}
      setFields={screenProps.setUserFilteredTodos}
      setUserFilteredTodos={screenProps.setUserFilteredTodos}
      />
    <Button
     onPress={() => navigation.navigate('LoginSetting')}
     title="Enter Travel Dates"
     />
   <HeroText>Manage Your Travel Todo-list:</HeroText>
   <Button
      onPress={() => navigation.navigate('TodoListTab')}
      title="See All Your Todos"
      />
    <Button
      onPress={() => navigation.navigate('CalendarTab')}
      title="See Your Todos by Date"
      />
    <HeroText>Resources:</HeroText>
    <Button
      onPress={() => navigation.navigate('TranslateTab')}
      title="Useful Japanese Phrases"
      />
  </ScrollView>
);

const LoginScreen = ({ navigation, screenProps}) => (
  <Login
    navigation={navigation}
    screenProps={screenProps}
    />
);

const DetailsScreen = ({ navigation }) => (
  <Details
    activity={navigation.state.params.activity}
    navigation={navigation}
  />
);
const TodoListScreen = ({ navigation, screenProps}) => (
  <TodoList
    filters={screenProps.activeUsers}
    setFilters={screenProps.setActiveUsers}
    fields={screenProps.userFilteredTodos}
    setFields={screenProps.setUserFilteredTodos}
    navigation={navigation}
  />
);
const CalendarScreen = ({ navigation, screenProps}) => (
  <Calendar
    fields={screenProps.userFilteredTodos}
    activeUsers={screenProps.activeUsers}
    navigation={navigation}
  />
);
const TranslateScreen = ({ navigation, screenProps }) => (
  <Translate
    filters={screenProps.activeTranslate}
    setFilters={screenProps.setActiveTranslate}
    fields={screenProps.filteredTranslations}
    setFields={screenProps.setFilteredTranslations}
    navigation={navigation}
  />
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
            source={require('../assets/navbar/home.png')}
            style={[styles.tabBarIcon, {tintColor: tintColor}]}
          />),
        headerStyle:{ backgroundColor: '#22264b'},
        headerTitleStyle:{ color: '#e8edf3'},
      },
    },

    TranslateTab: {
      screen: TranslateScreen,
      path: '/translate',
      navigationOptions: {
        title: 'Translate',
        tabBarLabel: 'Translate',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../assets/navbar/translate.png')}
            style={[styles.tabBarIcon, {tintColor: tintColor}]}
          />),
        headerStyle:{ backgroundColor: '#22264b'},
        headerTitleStyle:{ color: '#e8edf3'},
      },
    },
    TodoListTab: {
      screen: TodoListScreen,
      path: '/list',
      navigationOptions: {
        title: 'Things To Do',
        tabBarLabel: 'To-dos',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../assets/navbar/list.png')}
            style={[styles.tabBarIcon, {tintColor: tintColor}]}
          />),
        headerStyle:{ backgroundColor: '#22264b'},
        headerTitleStyle:{ color: '#e8edf3'},
      },
    },
    CalendarTab: {
      screen: CalendarScreen,
      path: '/calendar',
      navigationOptions: {
        title: 'Calendar',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../assets/navbar/calendar.png')}
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
  LoginSetting: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login As',
      headerStyle: { backgroundColor: '#22264b'},
      headerTitleStyle: { color: '#e8edf3'},
      headerTitleStyle:{ color: '#e8edf3'},
      headerTintColor: '#e8edf3',
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

//The AppContainer passes all the possible actions to the View components
class AppContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TravelAppJapan screenProps={this.props} />
    )
  }
}

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

/*************** Redux Stuff ****************/

//Dispatching funcitons (boilerplate)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  //the state in the argument is the global state of the application
  return {
    todoCount: state.todoCount,
    users: state.users,
    activeUsers: state.activeUsers,
    userFilteredTodos: state.userFilteredTodos,
    activeTranslate: state.activeTranslate,
    filteredTranslations: state.filteredTranslations,
  }
}, mapDispatchToProps)(AppContainer);
