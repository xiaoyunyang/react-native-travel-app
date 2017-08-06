import React, { Component } from 'react'

import {
  View,
  Dimensions,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  StatusBar,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

var FilterBar = require('./FilterBar');
import isGuest from '../lib/isGuest';

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}

class Login extends Component {
  constructor(props) {
    super(props);
    let usersInit = this.props.screenProps.activeUsers.map(u => u.tag)
    this.state = {
      textEntry1: usersInit[0],
      textEntry2: usersInit[1],
      textEntry3: usersInit[2],
    };
  }
  handleTextInput1(event) {
    let textEntry1 = event.nativeEvent.text;
    this.setState({
      textEntry1,
    });
  }
  handleTextInput2(event) {
    let textEntry2 = event.nativeEvent.text;
    this.setState({
      textEntry2,
    });
  }
  handleTextInput3(event) {
    let textEntry3 = event.nativeEvent.text;
    this.setState({
      textEntry3,
    });
  }
  handleUpdateTravelers() {
    this.setNewUsers()
  }
  setNewUsers() {
    let oldUsers = this.props.screenProps.activeUsers
    let newUsers = oldUsers.map((u,i) => {
        let newU = u
        if(i==0) {
          newU.tag = this.state.textEntry1
        } else if(i==1) {
          newU.tag = this.state.textEntry2
        } else if(i==2) {
          newU.tag = this.state.textEntry3
        }
        return newU
      }
    )
    this.props.screenProps.setActiveUsers(newUsers)
    this.setTodos(newUsers)
  }
  setTodos(newUsers) {
    let newFields = this.props.screenProps.userFilteredTodos.map(todo => {
        var newTodo = todo;
        if(todo.tags.contains(newUsers[0]) ||
          todo.tags.contains(newUsers[1]) ||
          todo.tags.contains(newUsers[2])) {
          newTodo.active = true
        }
        return newTodo;
      }
    );
    let newFieldsGuest = this.props.screenProps.userFilteredTodos.map(todo => {
        var newTodo = todo;
          newTodo.active = true
          return newTodo;
        }
    );
    if(isGuest(newUsers)) {
      this.props.screenProps.setUserFilteredTodos(newFieldsGuest)
      let newActiveUsers = this.props.screenProps.activeUsers
      newActiveUsers.map(u => {
          var newU = u
          newU.active = true
          return newU
      })
      this.props.screenProps.setActiveUsers(newActiveUsers)
    } else {
      this.props.screenProps.setUserFilteredTodos(newFields)
    }
  }
  render() {
    let windowWidth = Dimensions.get('window').width;
    let windowHeight = Dimensions.get('window').height;

    return (
      <View>
        <ScrollView>
          <FilterBar
            filters={this.props.screenProps.activeUsers}
            setFilters={this.props.screenProps.setActiveUsers}
            fields={this.props.screenProps.userFilteredTodos}
            filterBarLabel={"Travelers"}
            setFields={this.props.screenProps.setUserFilteredTodos}
          />
          <View style={{flex: 3}}>
            <View style={styles.textBox}>
              <TextInput
                style={{height: 40 , margin: 0, color:'#22264b'}}
                placeholder={this.state.textEntry1.length == 0 ? "Traveler 1 First Name" : ""}
                value={this.state.textEntry1.length == 0 ?  "" : this.state.textEntry1}
                onChange={this.handleTextInput1.bind(this)}
                />
            </View>
            <View style={styles.textBox}>
              <TextInput
                style={{height: 40 , margin: 0, color:'#22264b'}}
                placeholder={this.state.textEntry2.length == 0 ? "Traveler 2 First Name" : ""}
                value={this.state.textEntry2.length == 0 ?  "" : this.state.textEntry2}
                onChange={this.handleTextInput2.bind(this)}
                />
            </View>
            <View style={styles.textBox}>
              <TextInput
                style={{height: 40 , margin: 0, color:'#22264b'}}
                placeholder={this.state.textEntry3.length == 0 ? "Traveler 3 First Name" : ""}
                value={this.state.textEntry3.length == 0 ?  "" : this.state.textEntry3}
                onChange={this.handleTextInput3.bind(this)}
                />
            </View>
            <Button onPress={this.handleUpdateTravelers.bind(this)} title="Update Travelers"/>
          </View>

        </ScrollView>
        <View style={{
            position: 'absolute',
            height: 40,
            top: windowHeight*0.8,
            width: windowWidth-20,
            alignSelf: 'center',
            backgroundColor: 'slategray',
          }}>
          <Button
            onPress={() => this.props.navigation.goBack(null)}
            color="white"
            title="OK" />
        </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({
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
  textBox: {
    backgroundColor: 'white',
    paddingLeft: 8,
    margin: 8
  },
})

module.exports = Login;
