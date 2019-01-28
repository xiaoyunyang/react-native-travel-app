import React from 'react';
import { Text, View } from 'react-native';

export default class PlanTripScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Plan Your Trip</Text>
        <Text>Browse Activities</Text>
      </View>
    );
  }
}
