import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  Button,
  ListView,
} from 'react-native';

class SimpleList extends Component {

  renderField(field) {
     var fieldElement = (
       <View style={{padding: 5}}>
         <Text style={styles.textNormal}>{field.en}</Text>
         <Text style={styles.textSmall}>{field.jp}</Text>
         <Text style={[styles.textSmall, {color: 'steelblue'}]}>@{field.tags.map((word) => word).join(' @')}</Text>
       </View>)
     if (field.active) {
       return fieldElement;
     } else {
         return null;
     }
   }
   render() {
     return (
       <ListView
         style={styles.container}
         removeClippedSubviews={false}
         dataSource={this.props.dataSource}
         renderRow={this.renderField.bind(this)}
         renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
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
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
})
module.exports = SimpleList;
