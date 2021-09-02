import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '../../utils/colors';

export default function AppButton({ title, style, onPress, isLoading, color = 'primary' }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: Colors[color] }, style]}
      onPress={onPress}
      activeOpacity={isLoading ? 1 : 0.5}
      disabled={isLoading}
    >
      {
        isLoading ?
          <ActivityIndicator size="small" />
          :
          <Text style={styles.buttonText}>{title}</Text>
      }

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%'
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase'
  }
});
