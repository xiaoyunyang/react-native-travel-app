import React from 'react';
import { ListView } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import TabNavigationContainer from './TabNavigationContainer';
import LoginScreen from './screens/loginScreen';
import SignupScreen from './screens/signupScreen';

const allPostsQuery = gql`
  query {
    allPosts(orderBy: createdAt_DESC) {
      id
      imageUrl
      description
    }
  }`;


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


class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      modalVisible: false,
      user: undefined,
    };
  }


  componentWillReceiveProps(nextProps) {
    if (!nextProps.allPostsQuery.loading && !nextProps.allPostsQuery.error) {
      const { dataSource } = this.state;
      this.setState({
        dataSource: dataSource.cloneWithRows(nextProps.allPostsQuery.allPosts),
      });
    }
  }

  render() {
    const App = createAppContainer(StackNavigator);
    return <App screenProps={this.props} />;
  }
}


export default graphql(allPostsQuery, { name: 'allPostsQuery' })(AppContainer);
