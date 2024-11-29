import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MusicControls = () => {
  return (
    <View style={styles.controlsContainer}>
      <TouchableOpacity style={styles.controlButton}>
        <Text style={styles.controlText}>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButton}>
        <Text style={styles.controlText}>Pause</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#222',
  },
  controlButton: {
    padding: 12,
    backgroundColor: '#00bcd4',
    borderRadius: 8,
  },
  controlText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MusicControls;
