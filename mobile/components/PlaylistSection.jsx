import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const PlaylistSection = ({ playlists }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Playlists</Text>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.playlistItem}>
            <Text style={styles.playlistText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  playlistItem: {
    padding: 12,
    backgroundColor: '#333',
    borderRadius: 8,
    marginBottom: 8,
  },
  playlistText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PlaylistSection;
