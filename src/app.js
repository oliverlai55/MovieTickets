import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { apiMiddleware, reducer } from './redux';
import {
  Navigator
} from 'react-native';
import Movies from './Movies';
import Confirmation from './Confirmation';

const RouteMapper = (route, navigator) => {
  if (route.name === 'movies') {
    return (
      <Movies navigator={navigator} />
    );
  } else if (route.name === 'confirmation') {
    return (
      <Confirmation code={route.code} navigator={navigator} />
    );
  }
};

// Create Redux store
const store = createStore(reducer, {}, applyMiddleware(apiMiddleware));

// Fetch movie data
store.dispatch({type: 'GET_MOVIE_DATA'});

export default class App extends Component {
  // Default to movies route
  // Use FloatFromBottom transition between screens
  // Pass a route mapper function
  // Wrapping Provider store around the whole Component
  // makes our Redux storage available to every component that needs it
  render() {
    return (
      <Provider store={store}>
      <Navigator
        initialRoute={{ name: 'movies' }}
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
        renderScene={RouteMapper}
      />
    </Provider>
    );
  }
}
