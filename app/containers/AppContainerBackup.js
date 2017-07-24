import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'

import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  StatusBar,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

var Login = require('../components/Login');

const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.active !== r2.active});

const styles = StyleSheet.create({
  marker: {
    backgroundColor: "#550bbc",
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: "#FFF",
    fontWeight: "bold"
  },
  container: {
    backgroundColor: '#e8edf3',
    padding: 8,
  },
  containerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8edf3',
    padding: 8,
  },
  textLarge: {
    color: '#22264b',
    fontWeight: 'bold',
    fontSize: 18
  },
  textNormal: {
    color: '#22264b',
    fontSize: 16
  },
  textSmall: {
    color: '#22264b',
    fontSize: 12
  },
})


class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  addTodo() {
    this.props.addTodo();
  }
  renderFilter(filter) {
    var filterBar = (
        <TouchableOpacity onPress={this.handleFilterClick.bind(this, filter)}>
            <Text style={{fontSize: 24, backgroundColor:(filter.active)?'blue':'grey', margin:5}}>{filter.tag}</Text>
      </TouchableOpacity>
    );
    return filterBar;
  }
  handleFilterClick(filter) {
    const newFilters = this.props.activeUsers.map(f => {
      let copyF = {...f};
      if (copyF.tag === filter.tag) {
        copyF.active = !filter.active;
      }
      return copyF;
    });
    this.props.setActiveUsers(newFilters)
  }
  render() {
    return (
      <View>
        <Text style={{marginTop: 20}}>
          I am App Container! Todos Count: {this.props.todoCount}
        </Text>
        <TouchableHighlight onPress={() => {this.addTodo()}}>
          <Text>Add todo</Text>
        </TouchableHighlight>

        <View style={styles.containerCenter}>
          <Text>Display Data For</Text>
          <View style={{height: 40, backgroundColor: 'steelblue'}}>
            <ListView
              style={{flexDirection:'row', flex:1, flexWrap:'wrap'}}
              horizontal={true}
              removeClippedSubviews={false}
              dataSource={ds2.cloneWithRows(this.props.activeUsers)}
              renderRow={this.renderFilter.bind(this)}
            />
          </View>

          <Login
            activeUsers={this.props.activeUsers}
            setActiveUsers={this.props.setActiveUsers}
          />
        </View>
      </View>
    )
  }
}

//Dispatching funcitons (boilerplate)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {
  //the state in the argument is the global state of the application
  return {
    todoCount: state.todoCount,
    activeUsers: state.activeUsers
  }
}, mapDispatchToProps)(AppContainer);
