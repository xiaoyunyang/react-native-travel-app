
import React from 'react';
import { Text, View } from 'react-native';

export default class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Plan your next trip</Text>
        <Text>See your current trip</Text>
        <Text>See your past trips</Text>
      </View>
    );
  }
}
