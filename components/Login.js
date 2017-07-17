import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  StatusBar,
  ListView,
  TouchableOpacity,
  TouchableHighLight,
} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';
import '../data/global.js';
const FILTERS = [
  {
    tag: "Filter",
    "active": false
  }
]
const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.active !== r2.active});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: this.props.filters,
      dataSource2: ds2.cloneWithRows(this.props.filters),
    };
  }
  renderFilter(filter) {
    var filterBar = (
        <TouchableOpacity onPress={this.handleFilterClick.bind(this, filter)}>
            <Text style={{fontSize: 24, backgroundColor:(filter.active)?'blue':'grey', margin:5}}>{filter.tag}</Text>
      </TouchableOpacity>
    );
    return filterBar;
  }
  handleFilterClick(filter) {
    const newFilters = this.state.filters.map(f => {
      let copyF = {...f};
      if (copyF.tag === filter.tag) {
        copyF.active = !filter.active;
      }
      return copyF;
    });
    this.setState({
      filters: newFilters,
      dataSource2: this.state.dataSource2.cloneWithRows(newFilters)
    });
    console.log(newFilters)
    this.props.modFilters(newFilters)
    this.props.handleFilterClick(filter)
  }
  render() {
    return (
      <View style={styles.containerCenter}>
        <Text>Display Data For</Text>
        <View style={{height: 40, backgroundColor: 'steelblue'}}>
          <ListView
            style={{flexDirection:'row', flex:1, flexWrap:'wrap'}}
            horizontal={true}
            removeClippedSubviews={false}
            dataSource={this.state.dataSource2}
            renderRow={this.renderFilter.bind(this)}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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

module.exports = Login;
