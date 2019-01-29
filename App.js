/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';

import AppContainer from './src/AppContainer';

import ListPage from './src/components/ListPage';

const simpleApi = 'https://api.graph.cool/simple/v1/cjrh62bkka7l501132k2sp85b';
const httpLink = new HttpLink({ uri: simpleApi });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer />
      </ApolloProvider>
    );
  }
}
