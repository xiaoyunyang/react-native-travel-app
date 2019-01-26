
import React from 'react';
import { Text, View } from 'react-native';

export default class SearchScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Find things to do around me!</Text>
      </View>
    );
  }
}
