import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { defaultStyles } from './styles';

// get screen dimensions
const { width, height } = Dimensions.get('window');

//set default pop up height to 67% of screen height
const defaultHeight = height * 0.67;

export default class MoviePopup extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    movie: PropTypes.object,     // Movie object that has title, genre, poster, days and times
    chosenDay: PropTypes.number, //index of chosen day
    chosenTime: PropTypes.number, // Index of chosen show time
    onChooseDay: PropTypes.func, //Gets called when user chooses days
    onChooseTime: PropTypes.func, //Get called when user books their ticket
    onBook: PropTypes.func,  //Get called when user books their ticket
    onClose: PropTypes.func, //Gets called when popup closed
  }

  state = {
    // Animates slide ups and downs when popup open or closed
    position: new Animated.Value(this.props.isOpen ? 0 : height),
    // Backdrop opacity
    opacity: new Animated.Value(0),
    // Popup height that can be changed by pulling it up or downs
    height: defaultHeight,
    // Expanded mode with bigger poster flag
    expanded: false,
    // visibility flag
    visible: this.props.isOpen
  };

  // When user starts pulling popup previous height gets stored here
  // to help us calculate new height value during and after pulling
  _previousHeight = 0

  componentWillMount() {
    // Initialize PanResponder to handle move gestures
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        // Ignore taps
        if (dx !== 0 && dy === 0) {
          return true;
        }
        return false;
      },
      
    })
  }

  // Handle isOpen changes to either open or close popup
  componentWillReceiveProps(nextProps) {
    // isOpen prop changed to true from false
    if (!this.props.isOpen && nextProps.isOpen) {
      this.animateOpen();
    }
    // isOpen prop changed to false from true
    else if (this.props.isOpen && !nextProps.isOpen) {
      this.animateClose();
    }
  }

  // Open popup
  animateOpen() {
    // Update state first
    this.setState({ visible: true }, () => {
      // And slide up
      Animated.timing(
        this.state.position, { toValue: 0 } // top of the screen
      ).start();
    });
  }

  // Close popup
  animateClose() {
    //slide down
    Animated.timing(
      this.state.position, { toValue: height } //bottom of the screen
    ).start(() => this.setState({ visible: false }));
  }

  render() {
    // Render nothing if not visible
    if (!this.state.visible) {
      return null;
    }

    return (
      <View style={styles.container}>
        { /*Closes popup if user taps on semi-transparent backdrop */ }
        <TouchableWithoutFeedback onPress={this.props.onClose}>
          <Animated.View style={styles.backdrop}/>
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.modal, {
            // Animates position on the screen
            transform: [{ translateY: this.state.position }, { translateX: 0 }]
          }]}
        >
          <Text>Popup</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Main container
  container: {
    ...StyleSheet.absoluteFillObject, // fill up all screen
    justifyContent: 'flex-end',       // align popup at the bottom
    backgroundColor: 'transparent'    // transparent background
  },
  // semi-transparent background below popup
  backdrop: {
    ...StyleSheet.absoluteFillObject, //fill up all screen
    backgroundColor: 'black',
    opacity: 0.5
  },
  // popup
  modal: {
    height: height / 2,   // take half of the screen height
    backgroundColor: 'white'
  }
});
