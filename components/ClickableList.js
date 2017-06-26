import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Button,
  ListView,
} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';
import Swipeout from 'react-native-swipeout';

class ClickableList extends Component {
  getDetail(field) {
    this.props.navigation.navigate('Details', {
      activity: field
    })
  }
  renderField(field) {
    let swipeLBtns = [
        {
          text: 'Duplicate',
          backgroundColor: '#9CC5C9',
          underlayColor: 'blue',
          onPress: () => { this.getDetail(field) }
       }
      ];
      let swipeRBtns = [
          {
            text: 'Delete',
            backgroundColor: '#D5544F',
            underlayColor: 'red',
            onPress: () => { this.getDetail(field) }
         }
        ];
     var fieldElement = <Swipeout left={swipeLBtns} right={swipeRBtns} style={{flexDirection:'column', borderWidth: 1, borderColor: 'white', marginTop: 5}}>
         <TouchableHighlight underlayColor='silver' onPress={() => this.getDetail(field)}>
           <View style={{backgroundColor: 'white', padding: 5}}>
             <Text style={styles.textLarge}>{field.title}</Text>
             <Text style={styles.textNormal}>{field.subtitle}</Text>
             <Text style={styles.textSmall}>{field.date}</Text>
             <Text style={[styles.textSmall, {color: 'steelblue'}]}>@{field.tags.map((word) => word).join(' @')}</Text>
           </View>
       </TouchableHighlight>
     </Swipeout>

     if (field.active) {
       return fieldElement;
     } else {
         return null;
     }
   }
   render() {
     return (
       <ListView
         removeClippedSubviews={false}
         dataSource={this.props.dataSource}
         renderRow={this.renderField.bind(this)}
       />
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
    backgroundColor: '#e8edf3'
  },
  textNormal: {
    color: '#22264b',
    fontSize: 16
  },
  textSmall: {
    color: '#22264b',
    fontSize: 12
  },
  textLarge: {
    color: '#22264b',
    fontWeight: 'bold',
    fontSize: 18
  }
})
module.exports = ClickableList;
