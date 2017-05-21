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
  ListView
} from 'react-native';

import { fetch } from 'fetch';

import Icon from 'react-native-vector-icons/MaterialIcons';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})


var styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      height: 24
   },
   headerContainer: {
      flex: 2 ,
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#ed3d6c",
      alignItems:"center",
      paddingRight: 5
   },
   leftHeaderContainer: {
      alignItems: "flex-start",
      flexDirection: "row"
   },
   rightHeaderContainer: {
      alignItems: "flex-end",
      flexDirection: "row"
   },
   contentContainer: {
      flex: 6,
   },
   logoText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      alignItems: "flex-start",
      marginLeft: 10
   },
   tabBar: {
     color: "blue",
     flexDirection: "row"
   },
   logoText: {
  color: "white",
  fontWeight: "bold",
  fontSize: 16,
  alignItems: "flex-start",
  marginLeft: 10
},
listItemContainer: {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  padding: 10
},
iconContainer: {
  flex: 1,
  alignItems: "flex-start"
},
callerDetailsContainer: {
  flex: 4,
  justifyContent: "center",
  borderBottomColor: "rgba(92,94,94,0.5)",
  borderBottomWidth: 0.25
},
callerDetailsContainerWrap: {
  flex: 1,
  alignItems: "center",
  flexDirection: "row"
},
nameContainer: {
  alignItems: "flex-start",
  flex: 1
},
dateContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
},
callIconContainer: {
  flex: 1,
  alignItems: "flex-end"
},
initStyle: {
  borderRadius: 30,
  width: 60,
  height: 60
}
});


export default class mylist extends Component {

  constructor(props) {
    super(props)
    this.state = {
      peopleDataSource: ds.cloneWithRows([]),
      loaded: false
    }
  }


  render() {
  return (
    <View style = {styles.mainContainer}>
    <View style={styles.contentContainer}>
        <ListView
          initialListSize={5}
          removeClippedSubviews={false}
          enableEmptySections={true}
          dataSource={this.state.peopleDataSource}
          renderRow={(person) => { return this.renderPersonRow(person) }} />
    </View>
    </View>
  );
}

renderPersonRow(person) {
  return (
    <View style = {styles.listItemContainer}>
 <View style= {styles.iconContainer}>
  <Image source={{uri:person.image}} style={styles.initStyle} resizeMode='contain' />
 </View>
 <View style = {styles.callerDetailsContainer}>
  <View style={styles.callerDetailsContainerWrap}>
   <View style={styles.nameContainer}>
     <Text>{person.first_name}</Text>
     <View style={styles.dateContainer}>
       <Icon name={person.missed ? "call-missed" : "call-received"} size={15} color={person.missed ? "#ed788b" : "#075e54"} />
       <Text style={{ fontWeight:'400', color:'#666', fontSize:12 }}>{person.date} {person.time}</Text>
     </View>
    </View>
  <View style={styles.callIconContainer}>
   <Icon name="phone" color='#075e54' size={23} style={{ padding:5 }} />
  </View>
 </View>
</View>
</View>
  )
}

componentDidMount() {

var japanData = require('./JapanLinks.json');

this.setState({
  peopleDataSource: ds.cloneWithRows(japanData),
  loaded: true
})

}
}

module.exports = mylist;
