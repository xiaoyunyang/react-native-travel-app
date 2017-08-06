/**
 * Travel Event App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './app/reducers'
import AppContainer from './app/containers/AppContainer'

//Redux Storage imports. AsyncStorage is the Storage Engine
import {persistStore, autoRehydrate} from 'redux-persist'
import {AsyncStorage} from 'react-native'

//define logger middleware: set logger for only development mode
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

function configureStore(initialState) {
  //more boilerplate. Enhancer composes different middleware
  const enhancer = compose(
    autoRehydrate(),
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  );
  return createStore(reducers, initialState, enhancer);
}

const store = configureStore({});

/*  Enable PersistStore by uncommenting below */
persistStore(store, {storage: AsyncStorage})

//Wrapping our TravelAppJapan app inside of the Provider
const App = () => (
  <Provider store={store}>
    <AppContainer/>
  </Provider>
)

AppRegistry.registerComponent('TravelJapan', () => App);
