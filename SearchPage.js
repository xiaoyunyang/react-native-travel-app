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
  WebView
} from 'react-native';


var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  }
});


class SearchPage extends Component {
  render() {
    return (
      <WebView
         source={{uri: 'https://www.tripadvisor.com/Attraction_Review-g298564-d4112565-Reviews-Kyoto_Sagano_Walk-Kyoto_Kyoto_Prefecture_Kinki.html'}}
         style={{marginTop: 20}}
       />
    );
  }
}

module.exports = SearchPage;
