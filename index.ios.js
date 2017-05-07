
'use strict'

var React = require('react');
var ReactNative = require('react-native');

var SearchPage = require('./SearchPage');

var styles = ReactNative.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});

class HelloWorld extends React.Component {
  render() {
    return React.createElement(ReactNative.Text, {style: styles.text}, "Hello World!");
  }
}


class JapanApp extends React.Component {
  render() {
    return (
      <ReactNative.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'JapanApp',
          component: SearchPage,
        }}/>
    );
  }
}


ReactNative.AppRegistry.registerComponent('JapanApp', () => JapanApp);
