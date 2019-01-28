import React from 'react';
import { Button, Text, View } from 'react-native';

export default class LoginScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login Screen</Text>
        <Button
          title="Login"
          onPress={() => {
            navigation.navigate('App');
          }}
        />
        <Text>New to AnotherTravelApp?</Text>
        <Button
          title="Signup"
          onPress={() => {
            navigation.navigate('Signup');
          }}
        />
      </View>
    );
  }
}
