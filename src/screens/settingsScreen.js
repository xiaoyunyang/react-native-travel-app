import React from 'react';
import { Text, View } from 'react-native';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Xiaoyun Yang',
    };
  }

  render() {
    const { name } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Text>{name}</Text>
      </View>
    );
  }
}
