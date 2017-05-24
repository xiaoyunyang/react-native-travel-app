'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  WebView,
  Button,
  DatePickerIOS,
} from 'react-native';


var styles = StyleSheet.create({
    container: {
      width: 375,
      marginTop: -200,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
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

var Carousel = require('react-native-carousel')

var Calendar = React.createClass({

  render() {
    //var imgs = ['./static/img/OscarTheGrouch.png', './static/img/HappyEmoji.png', './static/img/CryingFace.jpeg']
    var startDate = new Date(2017, 7, 7) //2017, August 7
    var endDate = new Date(2017, 7, 17) //2017, August 17


    var travelDates = getElapsedDates(startDate, endDate)
    //dates(startDate, endDate)
    //var sources = imgs.map(d => require(d))
    var today = new Date()


    var tomorrow = getTomorrow(today)

    return (
      <Carousel animate = {false}>
        {
          travelDates.map( (d, i) => {
            return (
              <View key={i} style={styles.container}>
                  <View style={{width: 250, height: 200,  alignItems: 'center', backgroundColor: 'skyblue'}}>
                    <Image source={require('./static/img/OscarTheGrouch.png')}
                       style={{width: 100, height: 100}} />
                     <Text style={{fontSize: 24}}>{d.toDateString()}</Text>
                     <Text>{"Today is "+today.toDateString()}</Text>
                     <Text>{"StartDate is "+startDate.toDateString()}</Text>
                     <Text>{"endDate is "+endDate.toDateString()}</Text>
                     <Text>{"tomorrow is "+tomorrow.toDateString()}</Text>
                  </View>
              </View>
            )
          })
        }
     </Carousel>


/*
      <Carousel animate = {false}>
        <View style={styles.container}>
          <Image style={{width: 100, height: 100}} source = {require('./static/img/OscarTheGrouch.png')}/>
        </View>
        <View style={styles.container}>
          <Image style={{width: 100, height: 100}} source = {require('./static/img/HappyEmoji.png')}/>
        </View>
        <View style={styles.container}>
          <Image style={{width: 100, height: 100}} source = {require('./static/img/CryingFace.jpeg')}/>
        </View>
      </Carousel>
  */
    );
  }
})

module.exports = Calendar
