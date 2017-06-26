import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  StatusBar,
  ListView,
} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';
import MapView from 'react-native-maps';

//This changes the header status icons (the battery and wifi) to white.
StatusBar.setBarStyle('light-content', true)

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      initialRegion: {
        latitude: 35.667492,
        longitude: 139.763868,
        latitudeDelta: 0.0411,
        longitudeDelta: 0.0411,
      },
      todo: "none",
      image: "none",
      link: "none"
    }
    this.handlePress = this.handlePress.bind(this);
  }
  componentDidMount() {
    let id = this.props.activity.id

    let responseJson = require('../data/detail.json')

    let latitudes = responseJson[id].markers.map((marker) => {
      return marker.coordinate.latitude
    })
    let longitudes = responseJson[id].markers.map((marker) => {
      return marker.coordinate.longitude
    })
    let margin = 0.003;
    let maxLat = Math.max.apply(null, latitudes)
    let minLat = Math.min.apply(null, latitudes)
    let maxLon = Math.max.apply(null, longitudes)
    let minLon = Math.min.apply(null, longitudes)
    let centerLat = (maxLat + minLat) / 2
    let centerLon = (maxLon + minLon) / 2
    let latDelta = maxLat - minLat + margin;
    let lonDelta = maxLon - minLon + margin;

    this.setState({
      markers: responseJson[id].markers,
      todo: responseJson[id].todo,
      image: responseJson[id].image,
      link: responseJson[id].link,
      initialRegion: {
        latitude: centerLat,
        longitude: centerLon,
        latitudeDelta: latDelta,
        longitudeDelta: lonDelta,
      },
    })
  }
  handlePress(e){
    /*
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          cost: "$20"
        }
      ]
    })*/
  }
  render() {
    return (
      <View>
        <View style={styles.containerCenter}>
          <Text style={[styles.textSmall, {color: 'steelblue'}]}>@{this.props.activity.tags.map((word) => word).join(' @')}</Text>
          <Text style={styles.textLarge}>{this.props.activity.title}</Text>
          <Text style={styles.textNormal}>{this.props.activity.subtitle}</Text>
        </View>

        <MapView
          style={styles.mapContainer}
          initialRegion={this.state.initialRegion}
          showsUserLocation={true}
        >

          {this.state.markers.map((marker,i) => {
            return (
              <MapView.Marker
                key={i}
                coordinate={marker.coordinate}
                title={marker.title}
                pinColor='red'
                description={""}/>)
          })}
        </MapView>
        <View style={styles.container}>
          <Text style={styles.textLarge}>What To Do:</Text>
          <Text style={styles.textNormal}>{this.state.todo}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    width: window.width,
    height: 300
  },
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

module.exports = Details;
