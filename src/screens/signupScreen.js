import React from 'react';
import { Button, Text, View } from 'react-native';

export default class SignupScreen extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Signup Screen</Text>
        <Button
          title="Signup"
          onPress={() => {
            navigation.navigate('App');
          }}
        />
        <Text>Already have an account?</Text>
        <Button
          title="Login"
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </View>
    );
  }
}
