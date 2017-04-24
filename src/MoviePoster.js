import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { defaultStyles } from './styles';

// Get screen Dimensions
const { width, height } = Dimensions.get('window');
// How many posters we want to have in each row and column
const cols = 3, rows = 3;

export default class MoviePoster extends Component {
  // Component propTypes
  static propTypes = {
    // Movie object with title, genre, and posters
    movie: PropTypes.object.isRequired,
    // Called when user taps on a poster
    onOpen: PropTypes.func.isRequired
  }

  render() {
    const { movie, movie: { title, genre, poster }, onOpen } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={() => onOpen(movie)}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: poster }} style={styles.image} />
        </View>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.genre} numberOfLines={1}>{genre}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginBottom: 10,
    height: (height - 20 - 20) / rows - 10,
    width: (width - 10) / cols - 10
  },
  imageContainer: { // take up all avail space
    flex: 1
  },
  image: {
    borderRadius: 10,
    ...StyleSheet.absoluteFillObject
  },
  title: {
    ...defaultStyles.text,
    fontSize: 14,
    marginTop: 4
  },
  genre: {
    ...defaultStyles.text,
    color: '#bbb',
    fontSize: 12,
    lineHeight: 14
  }
});
