import React, { Component } from 'react'

import {
  View,
  Text,
  Image,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ListView,
} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';
import Swipeout from 'react-native-swipeout';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Maybe add "Tomorrow it" or "Cancel it"?
const options = [
  {btnName: "Complete it"},
  {btnName: "Cancel"}
 ]

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
      lastModaled: null,
    };
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  getOptions(sectionID, rowID) {
    this.setState({autoClose: false})
    this.setState({selectedField: sectionID})
    this.setModalVisible(true)
    this.setState({lastModaled: sectionID})
  }
  handleOptionClick(option, field) {
    if(option=='Complete it' || option=='Uncomplete it') {
      this.props.setField(this.state.selectedField.id)
      this.setState({lastModaled: null})

    }
    //this.setState({autoClose: true})
    this.setState({selectedField: null})
    this.setModalVisible(false)
  }
  closeSelected(field) {
    if(this.state.lastModaled == field) {
      return true
    }
    return false
  }
  getDetail(field) {
    this.props.navigation.navigate('Details', {
      activity: field
    })
  }
  renderBtns(sectionID, rowID, field) {
    let swipeFavIcon = <View>
      <Image
        style={{
          width: windowWidth*0.1,
          marginTop: 10,
          alignSelf: 'center'
        }}
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
            onPress: () => { this.getOptions(sectionID, rowID) }
         }
        ];
      return swipeRBtns;
  }
  renderField(field, sectionID, rowID) {

    var fieldElement = <Swipeout
     close={!(this.state.sectionID === sectionID && this.state.rowID === rowID) || this.closeSelected(field)}
     right={this.renderBtns(field, sectionID, rowID)}
     rowID={rowID}
     autoClose={this.state.autoClose}
     sectionID={sectionID}
     onOpen={(sectionID, rowID) => {
       this.setState({
         sectionID,
         rowID,
       })
     }}
     style={{flexDirection:'column', marginTop: 5}}>
      {this.renderFieldContent(field)}
   </Swipeout>

     if (field.active) {
       return fieldElement;
     } else {
         return null;
     }
   }
   renderFieldContent(field) {
     let fieldColor = field.completed ? '#e8edf3' : 'white'
     let borderWidth = (field==this.state.selectedField) ? 2 : 0
     let borderColor = '#62C2CC'

     if(this.props.isGuest) {
       return <TouchableHighlight underlayColor='silver' onPress={() => this.getDetail(field)}>
           <View style={{backgroundColor: fieldColor, borderColor: borderColor, borderWidth: borderWidth, padding: 5}}>
             <Text style={styles.textLarge}>{field.title}</Text>
             <Text style={styles.textNormal}>{field.subtitle}</Text>
           </View>
       </TouchableHighlight>
     }

     return <TouchableHighlight underlayColor='silver' onPress={() => this.getDetail(field)}>
       <View style={{backgroundColor: fieldColor, borderColor: borderColor, borderWidth: borderWidth, padding: 5}}>
         <Text style={styles.textLarge}>{field.title}</Text>
         <Text style={styles.textNormal}>{field.subtitle}</Text>
         <Text style={styles.textSmall}>{field.date}</Text>
         <Text style={[styles.textSmall, {color: 'steelblue'}]}>@{field.tags.map((word) => word).join(' @')}</Text>
       </View>
   </TouchableHighlight>
   }
   renderOption(d,i) {
     return <TouchableHighlight
       key={i}
       style={{
         padding: 8,
         margin: 4,
         borderRadius: 10,
         backgroundColor: 'white',
         width: windowWidth-20,
         alignItems: 'center',
         borderWidth: 1,
         borderColor: 'white'
       }}
       underlayColor='white'
       onPress={() => {
       this.handleOptionClick(d.btnName, this.state.selectedField)
     }}>
       <Text style={styles.textModal}>{d.btnName}</Text>
     </TouchableHighlight>
   }
   renderOptions(options) {
     let newOptions = options
     if(this.state.selectedField!=null && this.state.selectedField.completed) {
       newOptions[0].btnName = "Uncomplete it"
     } else {
       newOptions[0].btnName = "Complete it"
     }

     let renderedOptions = newOptions.map((d,i) => {
       return this.renderOption(d,i)
     })
     return renderedOptions
   }
   renderModal(options) {
     return <Modal
         animationType={"slide"}
         transparent={true}
         visible={this.state.modalVisible}
         onRequestClose={() => {alert("Modal has been closed.")}}
         >
        <View style={[{
            position: 'absolute',
            height: 100,
            top: windowHeight*0.85,
            width: windowWidth,
          }, styles.containerModal]}>
          <View style={{
            width: windowWidth,
            alignItems: 'center'
           }}>
           {
             this.renderOptions(options)
           }
         </View>
        </View>
       </Modal>
   }

   render() {
     let isGuest = false
     return (
       <View>
          <ListView
             removeClippedSubviews={false}
             dataSource={this.props.dataSource}
             renderRow={this.renderField.bind(this)}
           />
          {this.renderModal(options)}

        </View>
     );
   }
}
const styles = StyleSheet.create({
  containerModal: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
    color: '#62C2CC',
    fontWeight: 'bold',
    fontSize: 18,
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
