import React from 'react';
import {
  View, Image, Text, StyleSheet,
} from 'react-native';

export default class Post extends React.Component {
  state = {
    width: 0,
    height: 0,
  }

  componentDidMount() {
    console.log('Post....', this.props);
    if (this.props.imageUrl === '') return;

    Image.getSize(this.props.imageUrl, (width, height) => {
      const imageHeight = 250;
      const scaleFactor = height / imageHeight;
      const imageWidth = width / scaleFactor;
      this.setState({ width: imageWidth, height: imageHeight });
    });
  }

  render() {
    const { width, height } = this.state;
    const { imageUrl, description } = this.props;
    return (
      <View>
        <View style={styles.imageContainer}>
          {
            imageUrl === '' ? null
              : (
                <Image
                  source={{ uri: imageUrl }}
                  style={{ width, height }}
                  resizeMode="contain"
                />
              )
        }

        </View>
        <Text style={styles.title}>
          {description}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.07)',
  },
  title: {
    padding: 22,
    color: 'rgba(0,0,0,.8)',
    fontWeight: '300',
    fontSize: 16,
  },
});
