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
import SampleText from './SampleText';
import MapView from 'react-native-maps';

//This changes the header status icons (the battery and wifi) to white.
StatusBar.setBarStyle('light-content', true)

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [
        {
          title: 'Tokyo Ginza Bay Hotel',
          coordinate: {
            latitude: 35.667492,
            longitude: 139.763868,
          }
        }
      ]
    }
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress(e){
    console.log(this.state.markers)
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          cost: "$20"
        }
      ]
    })

  }
  render() {
    return (
      <View>
        <SampleText>{this.props.activity.id}</SampleText>
        <SampleText>{this.props.activity.title}</SampleText>
        <SampleText>{this.props.activity.subtitle}</SampleText>

        <MapView
          style={styles.mapContainer}
          initialRegion={{
            latitude: 35.667492,
            longitude: 139.763868,
            latitudeDelta: 0.0411,
            longitudeDelta: 0.0411,
          }}
        >
        {this.props.activity.markers.map((marker,i) => {
          return <MapView.Marker
            key={i}
            coordinate={marker.coordinate}
            title={marker.title}
            description={this.props.activity.title}/>
        })}
      </MapView>

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

module.exports = Details;
