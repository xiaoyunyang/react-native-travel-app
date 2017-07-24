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

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReduxers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './app/reducers'
import AppContainer from './app/containers/AppContainer'

//define logger middleware: set logger for only development mode
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

function configureStore(initialState) {
  //more boilerplate. Enhancer composes different middleware
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

//Wrapping our TravelAppJapan app inside of the Provider
const App = () => (
  <Provider store={store}>
    <AppContainer/>
  </Provider>
)

AppRegistry.registerComponent('TravelAppJapan', () => App);
