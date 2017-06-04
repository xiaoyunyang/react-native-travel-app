import React, { Component } from 'react'

import {
  View,
  Text,
  Button,
  ScrollView,
  ListView,
} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';
import SampleText from './SampleText';

class Details extends Component {
  render() {
    return (
      <ScrollView>
        <SampleText>{this.props.id}</SampleText>
        <SampleText>{this.props.title}</SampleText>
        <SampleText>Stuff</SampleText>
      </ScrollView>
    );
  }
}

module.exports = Details;
