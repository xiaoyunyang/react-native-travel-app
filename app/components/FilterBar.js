import React, { Component } from 'react'

import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.active !== r2.active});

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}

class FilterBar extends Component {
  constructor(props) {
    super(props);
  }
  renderFilter(filter) {
    const windowWidth = Dimensions.get('window').width;
    let margin = 3
    let filterBarWidth = 0.95*windowWidth / this.props.filters.length - margin * this.props.filters.length;

    var filterBar = (
        <TouchableOpacity onPress={this.handleFilterClick.bind(this, filter)}>
            <Text style={
                {
                  width: filterBarWidth,
                  fontSize: 18,
                  textAlign: 'center',
                  backgroundColor:(filter.active)?'#434c5b':'#eceff5',
                  color:(filter.active)?'white':'slategray',
                  borderColor: (filter.active)?'#b56969':'slategray',
                  borderWidth: 2,
                  margin: margin,
                  padding: 5,
                }}>
                  {filter.tag}
            </Text>
      </TouchableOpacity>
    );
    return filterBar;
  }
  handleFilterClick(filter) {
    const newFilters = this.props.filters.map(f => {
      let copyF = {...f};
      if (copyF.tag === filter.tag) {
        copyF.active = !filter.active;
      }
      return copyF;
    });
    this.props.setFilters(newFilters)
    this.props.setFields(this.filteredFields(newFilters))
  }
  filteredFields(filters) {

    //Get filtered tags
    var selectedTags = [];

    filters.forEach((filter) => {
      if (filter.active) {
        selectedTags.push(filter.tag);
      }
    });

    const resultFields = this.props.fields.map(f => {
      var copyF = {...f};

      //Filter
      let intersectTags = f.tags.filter(t => selectedTags.contains(t))
      if(selectedTags.length!=0 && intersectTags.length!=0) {
        copyF.active = true
        return copyF
      } else {
        copyF.active = false
        return copyF
      }
    });

    return resultFields;
  }
  render() {
    return (
      <View style={styles.containerCenter}>
        <View style={styles.containerCenter}>
          <Text>Display Data For</Text>
          <View style={{height: 40}}>
            <ListView
              style={{flexDirection:'row', flex:1, flexWrap:'wrap'}}
              horizontal={true}
              removeClippedSubviews={false}
              dataSource={ds2.cloneWithRows(this.props.filters)}
              renderRow={this.renderFilter.bind(this)}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
    padding: 5,
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

module.exports = FilterBar;
