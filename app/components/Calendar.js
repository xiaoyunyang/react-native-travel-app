'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  WebView,
  Button,
  DatePickerIOS,
  TouchableOpacity,
} from 'react-native';

var ClickableList = require('./ClickableList');
var Carousel = require('react-native-carousel')

let getTomorrow = today => {
  return new Date(today.getTime()+1000*60*60*24);
}
let areDatesSame = (d1, d2) => {
  return d1.toDateString() === d2.toDateString()
}
let getElapsedDates = (startDate, endDate) => {
  //TODO: Need to add logic here if startDate is greater than endDate, then return. Something's wrong
  var start = startDate
  var arr = []
  while(!areDatesSame(start, endDate)) {
    arr = arr.concat(start)
    start = getTomorrow(start)
  }
  return arr
}

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Calendar extends Component {
  static navigationOptions = {
    title: "Calendar",
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/navbar/calendar.png')}
        style={[styles.tabBarIcon, {tintColor: tintColor}]}
      />),
  };
  constructor(props) {
    super(props);
    var startDate = new Date(2017, 7, 7) //2017, August 7
    var endDate = new Date(2017, 7, 18) //2017, August 18

    this.state = {
      startDate: startDate,
      endDate: endDate,
      travelDates: getElapsedDates(startDate, endDate),
      carouselDate: startDate.toDateString(),
    };
  }

  filteredFields(dateString) {
    return this.props.fields.filter(d => d.date == dateString)
  }
  handlePageChange(index) {
    //argument: index of the array mapped to the carousel pages

    var selectedDate = this.state.travelDates[index].toDateString();

    this.setState({
      carouselDate: selectedDate
    })
  }
  gotoToday(today) {
    //returns the index of the Carousel for the date
    var selectedDate = this.state.travelDates.filter(d => today >= d)
    if(selectedDate.length <= 0) return 0;
    return selectedDate.length-1;
  }
  render() {
    var today = new Date()
    var tomorrow = getTomorrow(today)

    const {navigate} = this.props.navigation

    return (
      <View style={{flex: 1}}>
        <View style={{height: 170}}>
          <Carousel
            initialPage={this.gotoToday(today)}
            hideIndicators={false}
            indicatorAtBottom={true}
            indicatorOffset={-10}
            inactiveIndicatorColor="silver"
            indicatorColor="#22264b"
            animate={false}
            onPageChange={this.handlePageChange.bind(this)}>
            {
              this.state.travelDates.map( (d, i) => {
                return (
                  <View key={i} style={[styles.containerCenter, {width: 375}]}>
                      <View style={{alignItems: 'center', width: 200, backgroundColor: "#e6cf8b", marginTop: -25}}>
                        <Image source={require('../assets/calendar.png')}
                           style={{width: 50, height: 50, marginTop: 10}} />
                         <Text style={styles.textLarge}>{d.toDateString()}</Text>
                         <Text style={styles.textNormal}>{"Today is "+today.toDateString()}</Text>
                         <Text style={[styles.textNormal, {marginBottom: 10}]}>{"tomorrow is "+tomorrow.toDateString()}</Text>
                      </View>
                  </View>
                )
              })
            }
          </Carousel>
        </View>
        <View style={[styles.container, {flex: 10}]}>
          <Text style={styles.textLarge}>Activities:</Text>
          <Text style={[styles.textNormal]}>
            Display Data for:  {this.props.activeUsers.map(u =>
               u.active ? '@'+ u.tag+ ' ' : '')}
          </Text>
          <ClickableList
            dataSource={ds.cloneWithRows(this.filteredFields(this.state.carouselDate))}
            navigation={this.props.navigation}
            />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8edf3'
  },
  container: {
    backgroundColor: '#e8edf3',
    padding: 8
  },
  textNormal: {
    color: '#22264b',
    fontWeight: 'bold',
    fontSize: 12
  },
  textLarge: {
    color: '#22264b',
    fontWeight: 'bold',
    fontSize: 22
  }
})
module.exports = Calendar
