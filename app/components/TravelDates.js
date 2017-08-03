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

import DatePicker from 'react-native-datepicker'
var FilterBarToggle = require('./FilterBarToggle');

const ACTIVE_DURATIONS = [
  {
    "tag": "4 days", "active": true
  }, {
    "tag": "7 days", "active": false
  }, {
    "tag": "11 days", "active": true
  }
]

const DATE_FORMAT = "YYYY-MM-DD"
let date2DateString = (date, format) => {
  let dateString = date.toDateString()
  if(format="YYYY-MM-DD") {
    return dateString = date.getFullYear() + '-'
           + ('0' + (date.getMonth()+1)).slice(-2) + '-'
           + ('0' + date.getDate()).slice(-2)
  }
  return dateString
}
let dateString2Date = (dateStr) => {
  //Note, dateStr has to be in the format YYYY-MM-DD
  let [yr, mon, day] = dateStr.toString().split('-')
  return new Date(yr, mon-1, day)
}
let getTomorrow = today => {
  return new Date(today.getTime()+1000*60*60*24);
}
let getAllDates = (startDate, duration) => {
  //TODO: Need to add logic here if startDate is greater than endDate, then return. Something's wrong
  //TODO: convert this ugly imperative code to map then a reduce
  var curr = startDate
  var arr = []
  for(i=0; i < duration; i++) {
    arr = arr.concat(curr)
    curr = getTomorrow(curr)
  }
  return arr
}

class TravelDates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null
    };
  }
  handleDateChange(date) {
    let newTravelDates = this.props.screenProps.travelDates
    newTravelDates[0] = date
    this.props.screenProps.setTravelDates(newTravelDates)
    this.setTravelDates(date, this.props.screenProps.activeDurations)
    this.setState({date: date})
  }
  handleSetTravelDuration(newActiveDurations) {
    this.props.screenProps.setActiveDurations(newActiveDurations)
    //this.handleSetTravelDates(this.props.screenProps.travelDates[0], newActiveDurations)
  }
  handleSetTravelDates() {
    this.setTravelDates(this.props.screenProps.travelDates[0], this.props.screenProps.activeDurations)
  }
  setTravelDates(startDate, activeDurations) {

    let start = dateString2Date(startDate)
    let duration = activeDurations.filter(d => d.active)[0].tag

    duration = duration.split(' ')[0]
    let allDates = getAllDates(start, duration)
    let allDatesStr = allDates.map(d => date2DateString(d, DATE_FORMAT))
    this.props.screenProps.setTravelDates(allDatesStr)

  }
  render() {
    let windowWidth = Dimensions.get('window').width;
    let windowHeight = Dimensions.get('window').height;
    let today = new Date();
    let minDate = date2DateString(today, DATE_FORMAT);

    return (
      <View style={styles.containerCenter}>
        <Text style={styles.textLarge}>Pick Start Date:</Text>
        <View style={{flex: 3}, styles.containerCenter}>
          <DatePicker
            style={{width: 200}}
            date={this.props.screenProps.travelDates[0]}
            mode="date"
            placeholder="select date"
            format={DATE_FORMAT}
            minDate={minDate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) =>  this.handleDateChange(date)}
            />
          </View>
          <View style={{flex: 3}, styles.containerCenter}>
            <Text style={styles.textLarge}>Pick Duration of Trip:</Text>
            <FilterBarToggle
              filters={this.props.screenProps.activeDurations}
              setFilters={this.handleSetTravelDuration.bind(this)}
              filterBarLabel={"Travel Duration"}
              setFields={this.props.screenProps.setUserFilteredTodos}
              setUserFilteredTodos={this.props.screenProps.setUserFilteredTodos}
            />
          </View>
          <View style={{flex: 3}, styles.containerCenter}>
            { this.state.date!=null && <Button
                onPress={this.handleSetTravelDates.bind(this)}
                title="Set Travel Dates"/>
            }

          </View>
          <View style={{flex: 3}, styles.containerCenter}>
            <Text style={styles.textNormal}>Travel Dates</Text>
            <Text style={styles.textSmall}>Start: {this.props.screenProps.travelDates[0]}</Text>
            <Text style={styles.textSmall}>End: {this.props.screenProps.travelDates.slice(-1)[0]}</Text>
          </View>

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
              title="GO BACK" />
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

module.exports = TravelDates;
