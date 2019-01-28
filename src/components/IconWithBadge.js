import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View } from 'react-native';
import { red, white } from '../styles/colors';

export default class IconWithBadge extends React.Component {
  render() {
    const {
      name, badgeCount, color, size,
    } = this.props;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
        { badgeCount > 0 && (
          <View style={{
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: red,
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <Text style={{ color: white, fontSize: 10, fontWeight: 'bold' }}>{badgeCount}</Text>
          </View>
        )}
      </View>
    );
  }
}
