import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';  

const Album = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();  

  const tracks = [
    { 
      title: 'Filha do Deputado', 
      artist: 'MC Ryan SP / MC IG', 
      album: 'Bad Boys', 
      duration: '2:16',
      image: require('../../assets/images/filha.png'),
    },
    { 
      title: 'Noite Daquelas', 
      artist: 'MC Ryan SP', 
      album: 'Malandragem', 
      duration: '4:15',
      image: require('../../assets/images/noite.png'),
    },
    { 
      title: 'Giro Loko 2', 
      artist: 'MC Ryan SP', 
      album: 'Afrodite', 
      duration: '2:48',
      image: require('../../assets/images/giro.png'),
    },
  ];

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (currentTrack < tracks.length - 1) {
      setCurrentTrack(currentTrack + 1);
    }
  };

  const prevTrack = () => {
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const playPauseIcon = isPlaying
    ? require('../../assets/images/pause.png')
    : require('../../assets/images/play.png');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.albumContainer}>
        <Image 
          source={require('../../assets/images/album1.jpg')} 
          style={styles.albumImage} 
        />
        
        <Text style={styles.albumTitle}>MC Ryan SP</Text>
        <Text style={styles.albumArtist}>Cantor</Text>
        <Text style={styles.albumGenre}>Gênero: Funk</Text>
        <Text style={styles.albumDuration}>Duração: 32 min</Text>
        
        <TouchableOpacity style={styles.playButton} onPress={openModal}>
          <Text style={styles.playButtonText}>Tocar Música</Text>
        </TouchableOpacity>
        
        
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.homeButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible} 
        animationType="slide" 
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Image 
              source={tracks[currentTrack].image} 
              style={styles.albumImage} 
            />
            <Text style={styles.albumTitle}>{tracks[currentTrack].title}</Text>
            <Text style={styles.albumArtist}>{tracks[currentTrack].artist}</Text>
            <Text style={styles.albumGenre}>{tracks[currentTrack].album}</Text>
            <Text style={styles.albumDuration}>Duração: {tracks[currentTrack].duration}</Text>
            
            <View style={styles.controls}>
              <TouchableOpacity onPress={prevTrack} style={styles.controlButton}>
                <Image source={require('../../assets/images/back.png')} style={styles.controlIcon} />
              </TouchableOpacity>

              <TouchableOpacity onPress={togglePlayPause} style={styles.controlButton}>
                <Image source={playPauseIcon} style={styles.controlIcon} />
              </TouchableOpacity>

              <TouchableOpacity onPress={nextTrack} style={styles.controlButton}>
                <Image source={require('../../assets/images/next.png')} style={styles.controlIcon} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.relatedAlbums}>
        <Text style={styles.relatedTitle}>Álbuns Relacionados</Text>
        <View style={styles.relatedAlbumContainer}>
          <Image 
            source={require('../../assets/images/album2.jpg')} 
            style={styles.relatedAlbumImage} 
          />
          <Image 
            source={require('../../assets/images/album3.jpg')} 
            style={styles.relatedAlbumImage} 
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    paddingBottom: 30,
  },
  albumContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  albumImage: {
    width: 250,
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  albumTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  albumArtist: {
    color: '#bbb',
    fontSize: 18,
    marginBottom: 5,
  },
  albumGenre: {
    color: '#bbb',
    fontSize: 16,
    marginBottom: 5,
  },
  albumDuration: {
    color: '#bbb',
    fontSize: 16,
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#1E90FF',  
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  controlButton: {
    marginHorizontal: 15,
  },
  controlIcon: {
    width: 50,
    height: 50,
  },
  relatedAlbums: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  relatedTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  relatedAlbumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  relatedAlbumImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#121212',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Album;
