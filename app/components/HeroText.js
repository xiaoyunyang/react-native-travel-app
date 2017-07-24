import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

/**
 * Used across examples as a screen placeholder.
 */
import type { Children } from 'react';

const HeroText = ({ children }: { children?: Children }) => (
  <View style={styles.containerCenter}>
    <Text style={styles.textLarge}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  containerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8edf3'
  },
  textLarge: {
    color: '#22264b',
    fontWeight: 'bold',
    fontSize: 18
  }
});
module.exports = HeroText;
