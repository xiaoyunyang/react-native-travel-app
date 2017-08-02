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

const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.active !== r2.active});
var FilterBar = require('./FilterBar');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textEntry1: '',
      textEntry2: '',
      textEntry3: '',
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
  handleAddUser(event) {
    let oldUsers = this.props.screenProps.users
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
    this.props.screenProps.setUsers(newUsers)
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
            setFields={this.props.screenProps.setUserFilteredTodos}
            setUserFilteredTodos={this.props.screenProps.setUserFilteredTodos}
          />
          <View style={{flex: 3}}>
            <View style={styles.textBox}>
              <TextInput
                style={{height: 40 , margin: 0, color:'#22264b'}}
                placeholder="Traveler 1 First Name"
                onChange={this.handleTextInput1.bind(this)}
                />
            </View>
            <View style={styles.textBox}>
              <TextInput
                style={{height: 40 , margin: 0, color:'#22264b'}}
                placeholder="Traveler 2 First Name"
                onChange={this.handleTextInput2.bind(this)}
                />
            </View>
            <View style={styles.textBox}>
              <TextInput
                style={{height: 40 , margin: 0, color:'#22264b'}}
                placeholder="Traveler 3 First Name"
                onChange={this.handleTextInput3.bind(this)}
                />
            </View>
            <Button onPress={this.handleAddUser.bind(this)} title="Add Travelers"/>
          </View>

        </ScrollView>
        <View style={{
            position: 'absolute',
            height: 40,
            top: windowHeight/2,
            width: windowWidth
          }}>
          <Button onPress={() => this.props.navigation.goBack(null)} title="Go back" />
        </View>
      </View>

    );
  }
}
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
  textBox: {
    backgroundColor: 'white',
    paddingLeft: 8,
    margin: 8
  },
})

module.exports = Login;
