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
      <View>
        <Text>{this.props.activity.id}</Text>
        <SampleText>{this.props.activity.title}</SampleText>
        <SampleText>{this.props.activity.subtitle}</SampleText>
      </View>
    );
  }
}

module.exports = Details;
