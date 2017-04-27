import React, { Component, PropTypes } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { defaultStyles } from './styles';

// Colors for smooth transition when user chooses an option
const colorDefault = 'rgba(255, 255, 255, 1)';
const colorSelected = 'rgba(103, 58, 183, 1)'; //purple
