# Travel Event App 
#### Made with React Native

## Product Specification:
This App is for planning a trip with your friends. It gives you:

* Access to your itinerary via calendar view
* Access to your list of planned activities
* An integrated to-do-list and a map for the area
* A quick lookup on the stuff you researched, including travel destination articles and translations for words from the local language to English

### Components:

``ActivityList`` 

* A ListView of all the activities planned for the trip/event.

``MyList`` 

* ``ActivityList`` with a search and tag filters. The search and tag filters are custom functions in the ``MyList`` component.

``Calendar``

* ``ActivityList`` with a calendar filter. The calendar filter is a ``Carousel`` component.


## Dependencies:
Before You start react-native run-ios in terminal, install the dependencies:
 
##### React Navigator
* [React Native Tab Navigator](https://github.com/expo/react-native-tab-navigator)
* [React Native Material Bottom Navigation](https://www.npmjs.com/package/react-native-material-bottom-navigation) -  A helper component to the Tab Navigator: 
* [TabNavigator main API](https://reactnavigation.org/docs/navigators/tab)
* [React Navigation Examples](https://github.com/react-community/react-navigation/tree/master/examples/NavigationPlayground/js)
* In the terminal

 ```
 npm install react-native-tab-navigator --save
 npm install react-native-material-bottom-navigation --save
 ```

##### Vector Icons  
 * [Vector Icons](https://github.com/oblador/react-native-vector-icons)
 * In the terminal

	```npm install react-native-vector-icons --save```
  
##### Carousel
 * [React Native Carousel](https://github.com/nick/react-native-carousel)
 * In the terminal 
 
 ```npm install react-native-carousel --save```
 
### Running the app:
* In the terminal: ```react-native run-ios``` 
* Running on Devices: [Read the Facebook doc](https://facebook.github.io/react-native/docs/running-on-device.html)

### Useful Resources:
* Tutorial and API - [React Native Tutorial from Facebook](https://facebook.github.io/react-native/releases/next/docs/getting-started.html)
* Stackoverflow - [How to increment JS Date](https://stackoverflow.com/questions/3674539/incrementing-a-date-in-javascript)
* API - [JavaScript Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* Material Design Icons - [Materials Icon](https://material.io/icons/)
* Pretty Good Tutorial for Navigation - [The Tutorial](https://mentormate.com/blog/react-native-components/)
* How to import custom Fonts into Xcode project - [The Tutorial](http://codewithchris.com/common-mistakes-with-adding-custom-fonts-to-your-ios-app/)