import React from "react";

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingsScreen from './screens/searchScreen.js';
import PlanTripScreen from './screens/planTripScreen.js';
import SearchScreen from './screens/searchScreen.js';
import TripsScreen from './screens/tripsScreen.js';


// Icons
import IconWithBadge from './components/IconWithBadge';

const HomeIconWithBadge = (props) => {
  // You should pass down the badgeCount in some other ways like react context api, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;  
}


const navigationOptions = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      
      if (routeName === "Home") {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        IconComponent = HomeIconWithBadge;
      } else if (routeName ==="Settings") {
        iconName = "ios-options";
      } else if (routeName ==="Search") {
        iconName = "ios-search";
      } else if (routeName ==="Trips") {
        iconName = "ios-airplane";
      }

      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: PlanTripScreen,
    Search: SearchScreen,
    Trips: TripsScreen,
    Settings: SettingsScreen,
  },
  navigationOptions
);

export default createAppContainer(TabNavigator);