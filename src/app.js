import React, { Component } from 'react';
import {
  Navigator
} from 'react-native';
import Movies from './Movies';

const RouteMapper = (route, navigator) => {
  if (route.name === 'movies') {
    return <Movies navigator={navigator} />;
  }
};

export default class App extends Component {
  // Default to movies route
  // Use FloatFromBottom transition between screens
  // Pass a route mapper function
  render() {
    return (
      <Navigator
        initialRoute={{ name: 'movies' }}
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
        renderScene={RouteMapper}
      />
    );
  }
}
