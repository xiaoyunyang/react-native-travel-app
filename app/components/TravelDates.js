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

import DatePicker from 'react-native-datepicker';
import DateHelper from '../lib/DateHelper';
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

class TravelDates extends Component {
  constructor(props) {
    super(props);
  }
  handleDateChange(date) {
    let newTravelDates = this.props.screenProps.travelDates
    newTravelDates[0] = date
    this.props.screenProps.setTravelDates(newTravelDates)
    this.setTravelDates(date, this.props.screenProps.activeDurations)
  }
  handleSetTravelDuration(newActiveDurations) {
    this.props.screenProps.setActiveDurations(newActiveDurations)
    this.setTravelDates(this.props.screenProps.travelDates[0], newActiveDurations)
  }
  handleSetTravelDates(startDate, activeDurations) {
    this.setTravelDates(startDate, activeDurations)
  }
  setTravelDates(startDate, activeDurations) {
    if(startDate=="") return
    let start = DateHelper.dateString2Date(startDate)
    let duration = activeDurations.filter(d => d.active)[0].tag

    duration = duration.split(' ')[0]
    let allDates = DateHelper.getAllDates(start, duration)
    let allDatesStr = allDates.map(d => DateHelper.date2DateString(d, DATE_FORMAT))
    this.props.screenProps.setTravelDates(allDatesStr)

  }
  render() {
    let windowWidth = Dimensions.get('window').width;
    let windowHeight = Dimensions.get('window').height;
    let today = new Date();
    let minDate = DateHelper.date2DateString(today, DATE_FORMAT);

    return (
      <View style={styles.containerCenter}>
        <Text style={styles.textLarge}>Select Start Date:</Text>
        <View style={{flex: 3}, styles.containerCenter}>
          <DatePicker
            style={{width: 200}}
            date={this.props.screenProps.travelDates[0]}
            mode="date"
            placeholder={"select date"}
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
            <Text style={styles.textLarge}>Select Duration of Trip:</Text>
            <FilterBarToggle
              filters={this.props.screenProps.activeDurations}
              setFilters={this.handleSetTravelDuration.bind(this)}
              filterBarLabel={"Travel Duration"}
            />
          </View>
          <View style={{flex: 3}, styles.containerCenter}>
            <Text style={styles.textNormal}>Travel Dates Selected:</Text>
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

module.exports = TravelDates;
