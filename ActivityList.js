import React, { Component } from 'react'

import {
  View,
  Text,
  Button,
  ListView,
} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';
var SearchPage = require('./SearchPage');

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.active !== r2.active});

const FILTERS = [
  {
    tag: "eat",
    "active": false
  }
]
const FIELDS = [
  {
    title:"Tokyoo",
    subtitle: "Shinjuku",
    tags: [ "eat"],
    active: true,
  }
]

class ActivityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      dataSource: ds.cloneWithRows(FIELDS),
      dataSource2: ds2.cloneWithRows(FILTERS),
      filters: FILTERS,
      fields: FIELDS,
      json: 'stuff',
      isLoading: true
    };
  }
  renderField(field) {

     console.log("POOP: " + this.state.text)
     var fieldElement = <View style={{flexDirection:'column', borderWidth: 1, borderColor: 'steelblue', margin: 10}}>
       <Text style={{fontSize: 20}}>{field.title}</Text>
       <Text style={{fontSize: 14}}>{field.subtitle}</Text>
       <Text style={{fontSize: 14}}>{field.date}</Text>
       <Button
           onPress={() => this.props.navigation.navigate('Profile', { name: field.title })}
           title="Details →"
         />
       {field.tags.map((tagField, i) => {
         return (

           <View key={i}>
             <Text style={{fontSize: 14, color: 'steelblue'}}>#{tagField}</Text>
           </View>
         );
       })}
     </View>

     if (field.active) {
       return fieldElement;
     } else {
         return null;
     }
   }
   render() {
     console.log(this.state.text)
     return (
       <ListView
         removeClippedSubviews={false}
         dataSource={this.props.dataSource}
         renderRow={this.renderField.bind(this)}
       />
     );
   }
}
const activityList = StackNavigator({
  Main: {screen: ActivityList},
  Details: {screen: SearchPage}
})

module.exports = ActivityList;
