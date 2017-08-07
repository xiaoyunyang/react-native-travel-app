'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  Dimensions,
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

import DateHelper from '../lib/DateHelper';
import isGuest from '../lib/isGuest';

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
    let startDate = new Date(2017, 7, 7) //2017, August 7

    this.state = {
      carouselDate: startDate.toDateString(),
    };
  }

  filteredFields(dateString) {
    return this.props.fields.filter(d => d.date == dateString)
  }
  handlePageChange(index) {
    //argument: index of the array mapped to the carousel pages
    let startDate = new Date(2017, 7, 7) //2017, August 7
    let endDate = new Date(2017, 7, 18) //2017, August 18
    let travelDates = DateHelper.getElapsedDates(startDate, endDate)
    let selectedDate = travelDates[index].toDateString();

    this.setState({
      carouselDate: selectedDate
    })
  }
  gotoToday(today) {
    //returns the index of the Carousel for the date
    var selectedDate = this.props.travelDates.filter(d => today >= DateHelper.dateString2Date(d))
    if(selectedDate.length <= 0) return 0;
    return selectedDate.length-1;
  }
  setField(id) {
    let newFields = this.props.fields.map(f => {
      let newF = f
      if(f.id==id) {
        newF.completed = !newF.completed
      }
      return newF
    })
    this.props.setFields(newFields)
  }
  render() {
    let travelers = this.props.filters.map(f => f.tag)
    let noTravelers = travelers.reduce((a,b) => a+b) == ""
    if(noTravelers) {
      return <Text style={[{padding: 40}, styles.textLarge]}>❗Need to enter at least one traveler for the trip. Go to the Info tab.</Text>
    }
    if(this.props.travelDates.length < 4) {
      return <Text style={[{padding: 40}, styles.textLarge]}>❗Need to enter travel dates from the Info tab.</Text>
    }
    let travelDates = this.props.travelDates.map(d => DateHelper.dateString2Date(d))

    let users = this.props.filters.map(u => {
      return u.tag
    })

    var today = new Date()
    var tomorrow = DateHelper.getTomorrow(today)

    const {navigate} = this.props.navigation

    let windowWidth = Dimensions.get('window').width;
    let calWidth = windowWidth*0.7;

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
              travelDates.map( (d, i) => {
                return (
                  <View key={i} style={[styles.containerCenter, {width: windowWidth}]}>
                      <View style={{alignItems: 'center', width: calWidth, backgroundColor: "#e6cf8b", marginTop: -25}}>
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
        <View style={[styles.container, {flex: 10, marginBottom: 35}]}>
          <Text style={styles.textLarge}>Activities:</Text>
          <Text style={[styles.textNormal]}>
            Display Data for:  {this.props.filters.map(u =>
               u.active ? '@'+ u.tag+ ' ' : '')}
          </Text>
          <ClickableList
            dataSource={ds.cloneWithRows(this.filteredFields(this.state.carouselDate))}
            navigation={this.props.navigation}
            setField={this.setField.bind(this)}
            isGuest={isGuest(users)}
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
