import { createStackNavigator, createAppContainer } from 'react-navigation';
import TabNavigationContainer from './TabNavigationContainer';
import LoginScreen from './screens/loginScreen';
import SignupScreen from './screens/signupScreen';

const stackNavRoutes = {
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login',
      header: null,
    },
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: {
      title: 'Signup',
    },
  },
  App: {
    screen: TabNavigationContainer,
    navigationOptions: {
      title: 'App',
      header: null,
    },
  },
};

const StackNavigator = createStackNavigator(
  stackNavRoutes
);
const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;
