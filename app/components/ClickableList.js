import React, { Component } from 'react'

import {
  View,
  Text,
  Image,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableHighlight,
  ListView,
} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';
import Swipeout from 'react-native-swipeout';

class ClickableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGuest: true,
      sectionID: null,
      rowID: null,
      modalVisible: false,
      selectedField: null,
      autoClose: false,
    };
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  getOptions(field) {
    this.setState({selectedField: field})
    this.setModalVisible(true)
  }
  handleOptionClick(option) {
    if(option=='Complete it') {
      this.props.setField(this.state.selectedField.id)
      this.setModalVisible(false)
      this.setState({autoClose: true})
    }
  }
  getDetail(field) {
    this.props.navigation.navigate('Details', {
      activity: field
    })
  }
  renderField(field, sectionID: number, rowID: number) {
    let swipeFavIcon = <View>
      <Image
        style={styles.swipeImage}
        source={require("../../assets/more.png")}
        />
      <Text style={styles.swipeText}>More</Text>
      </View>;

    let swipeRBtns = [
        {
          text: 'Options',
          component: swipeFavIcon,
          backgroundColor: '#9CC5C9',
          underlayColor: '#62C2CC',
          onPress: () => { this.getOptions(field) }
       }
      ];
    let fieldColor = field.completed ? '#e8edf3' : 'white'
     var fieldElement = <Swipeout
       close={!(this.state.sectionID === sectionID && this.state.rowID === rowID)}
       right={swipeRBtns}
       rowID={rowID}
       sectionID={sectionID}
       autoClose={this.state.autoClose}
       onOpen={(sectionID, rowID) => {
         this.setState({
           sectionID,
           rowID,
         })
       }}
       scroll={event => console.log('scroll event') }
       style={{flexDirection:'column', marginTop: 5}}
       >
         <TouchableHighlight underlayColor='silver' onPress={() => this.getDetail(field)}>
           <View style={{backgroundColor: fieldColor, padding: 5}}>
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
   renderFieldGuest(field) {
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
     let windowWidth = Dimensions.get('window').width;
     let windowHeight = Dimensions.get('window').height;
     let isGuest = false
     return (
       <View>
       { this.props.isGuest && <ListView
           removeClippedSubviews={false}
           dataSource={this.props.dataSource}
           renderRow={this.renderFieldGuest.bind(this)}
         /> }
       { !this.props.isGuest && <ListView
          removeClippedSubviews={false}
          dataSource={this.props.dataSource}
          renderRow={this.renderField.bind(this)}
        />}
        <View >
            <Modal
              animationType={"slide"}
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {alert("Modal has been closed.")}}
              >
             <View style={[{
                 position: 'absolute',
                 height: 100,
                 top: windowHeight*0.74,
                 width: windowWidth,
               }, styles.containerModal]}>
               <View style={{
                 width: windowWidth,
                 alignItems: 'center'
                }}>
                {
                  [{btnName: "Complete it"},
                  {btnName: "Tomorrow it"},
                  {btnName: "Delete it"}].map((d,i) => {
                    return <TouchableHighlight
                      key={i}
                      style={{
                        width: windowWidth,
                        alignItems: 'center'
                      }}
                      underlayColor='white'
                      onPress={() => {
                      this.handleOptionClick(d.btnName)
                    }}>
                      <Text style={styles.textModal}>{d.btnName}</Text>
                    </TouchableHighlight>

                  })
                }
                <TouchableHighlight onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}>
                  <Text style={styles.textModal}>Cancel</Text>
                </TouchableHighlight>

              </View>
             </View>
            </Modal>
          </View>
        </View>
     );
   }
}
const styles = StyleSheet.create({
  containerModal: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'gray',
  },
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
  textModal: {
    color: '#22264b',
    fontWeight: 'bold',
    fontSize: 18
  },
  swipeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    alignSelf: 'center'
  },
  swipeImage: {
    width: 45,
    marginTop: 12,
    alignSelf: 'center'
  }
})
module.exports = ClickableList;
