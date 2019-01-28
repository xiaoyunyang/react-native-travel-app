import React from 'react';

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsScreen from './screens/settingsScreen';
import ProfileScreen from './screens/profileScreen';
import SearchScreen from './screens/searchScreen';
import TripsScreen from './screens/tripsScreen';

// constants
import { tomato, gray } from './styles/colors';

// Icons
import IconWithBadge from './components/IconWithBadge';

// You should pass down the badgeCount in some other ways like react context api,
// redux, mobx or event emitters.

const TabIconWithBadge = props => <IconWithBadge {...props} badgeCount={3} />;

const navigationOptions = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;

      if (routeName === 'Me') {
        iconName = 'ios-contact';
        IconComponent = TabIconWithBadge;
      } else if (routeName === 'Settings') {
        iconName = 'ios-options';
      } else if (routeName === 'Search') {
        iconName = 'ios-search';
      } else if (routeName === 'Trips') {
        iconName = 'ios-airplane';
      }

      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: tomato,
    inactiveTintColor: gray,
  },
};

const TabNavigator = createBottomTabNavigator(
  {
    Trips: TripsScreen,
    Search: SearchScreen,
    Me: ProfileScreen,
    Settings: SettingsScreen,
  },
  navigationOptions
);

export default createAppContainer(TabNavigator);
