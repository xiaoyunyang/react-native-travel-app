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

var ActivityList = require('./ActivityList');

var styles = StyleSheet.create({
    container: {
      width: 375,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'steelblue',
    },
})
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
const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.active !== r2.active});


const FIELDS = [
  {
    title:"Tokyoo",
    subtitle: "Shinjuku",
    tags: [ "eat"],
    active: true,
  }
]

var Carousel = require('react-native-carousel')

class Calendar extends Component {
  static navigationOptions = {
    title: "Calendar",
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('./assets/navbar/calendar.png')}
        style={[styles.tabBarIcon, {tintColor: tintColor}]}
      />),
  };
  constructor(props) {
    super(props);
    var startDate = new Date(2017, 7, 7) //2017, August 7
    var endDate = new Date(2017, 7, 18) //2017, August 18

    this.state = {
      activities: ds.cloneWithRows(FIELDS),
      fields: FIELDS,
      json: 'stuff',
      isLoading: true,
      startDate: startDate,
      endDate: endDate,
      travelDates: getElapsedDates(startDate, endDate),
      carouselDate: startDate,
    };
  }
  componentDidMount() {
    const test = true
    const dataUrl = 'https://facebook.github.io/react-native/movies.json'
    if(test) {
      let responseJson = require('./data/japan.json')
      this.setState({
        json: responseJson,
        activities: ds.cloneWithRows(responseJson.FIELDS),
        fields: responseJson.FIELDS,
        isLoading: false,
      }, function() {
        this.filterActivities(this.state.carouselDate.toDateString())
      })
    }
    else {
      return fetch(dataUrl)
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             json: responseJson,
             activities: ds.cloneWithRows(responseJson.FIELDS),
             fields: responseJson.FIELDS,
             isLoading: false,
           }, function() {
             this.filterActivities(this.state.carouselDate.toDateString())
           })
         }).bind(this)
         .catch((error) => {
           console.error(error);
         });
     }
  }
  filterActivities(dateString) {
    var as = this.state.fields.filter(d => d.date == dateString)
    this.setState({
      activities: this.state.activities.cloneWithRows(as),
    })
  }
  handlePageChange(index) {
    //argument: index of the array mapped to the carousel pages

    var selectedDate = this.state.travelDates[index].toDateString();

    this.setState({
      carouselDate: selectedDate
    })
    this.filterActivities(selectedDate);
  }
  render() {
    //var imgs = ['./static/img/OscarTheGrouch.png', './static/img/HappyEmoji.png', './static/img/CryingFace.jpeg']

    //var travelDates = getElapsedDates(this.state.startDate, this.state.endDate)
    //dates(startDate, endDate)
    //var sources = imgs.map(d => require(d))
    var today = new Date()
    var tomorrow = getTomorrow(today)
    const {navigate} = this.props.navigation

    return (
      <View style={{flex: 1}}>
        <View style={{height: 20, backgroundColor: 'blue'}}/>
        <View style={{height: 120}}>
          <Carousel animate={false} onPageChange={this.handlePageChange.bind(this)}>
            {
              this.state.travelDates.map( (d, i) => {
                return (
                  <View key={i} style={styles.container}>
                      <View style={{alignItems: 'center', width: 200, backgroundColor: "skyblue", marginTop: 0}}>
                        <Image source={require('./assets/calendar.png')}
                           style={{width: 50, height: 50}} />
                         <Text style={{fontSize: 24}}>{d.toDateString()}</Text>
                         <Text>{"Today is "+today.toDateString()}</Text>
                         <Text>{"tomorrow is "+tomorrow.toDateString()}</Text>
                      </View>
                  </View>
                )
              })
            }
          </Carousel>
        </View>
        <View style={{flex: 10, backgroundColor: 'skyblue'}}>
          <Text>Activities:</Text>
          <ActivityList dataSource={this.state.activities} navigation={this.props.navigation}/>
        </View>
      </View>

    );
  }
}

module.exports = Calendar
