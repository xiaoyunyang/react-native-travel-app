import React from "react";
import { Button, View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import TabNavigationContainer from "./TabNavigationContainer";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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


class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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

class AppNavigator extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>The App</Text>
      </View>
    );
  }
}

const stackNavRoutes = {
  Login: {
    screen: LoginScreen, // Should Be Login Page
    navigationOptions: {
      title: 'Login',
      header: null
    }
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: {
      title: 'Signup'
    }
  },
  App: {
    screen: TabNavigationContainer,
    navigationOptions: {
      title: 'App',
      header: null
    }
  }
};

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const stackNavConfig = {
  initialRouteName: "Login"
};

const StackNavigator = createStackNavigator(
  stackNavRoutes
);
const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;
