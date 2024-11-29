import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const playlists = [
    { id: '1', title: 'Reggae', cover: require('../../assets/images/reggae.png') },
    { id: '2', title: 'Sertanejo Raiz', cover: require('../../assets/images/sertanejoraiz.png') },
    { id: '3', title: 'Pagodin', cover: require('../../assets/images/pagodin.png') },
    { id: '4', title: 'MPB', cover: require('../../assets/images/mpb.png') },
    { id: '5', title: 'Cardio', cover: require('../../assets/images/cardio.png') },
  ];

  const suggested = [
    { id: '6', title: 'Podpah', cover: require('../../assets/images/podpah.png') },
    { id: '7', title: 'Inteligência LTDA', cover: require('../../assets/images/ltda.png') },
    { id: '8', title: 'Flow Podcast', cover: require('../../assets/images/flow.png') },
    { id: '9', title: 'Ticaraticast', cover: require('../../assets/images/tica.png') },
  ];

  const continueListening = [
    { id: '10', title: 'Pretinho Básico', cover: require('../../assets/images/pretinho.png') },
  ];

  const songs = [
    { id: '1', title: 'Bad Boys', artist: 'Mc IG, Mc Ryan SP, Mc PH, DJ Glenner, Mano Brown' },
    { id: '2', title: 'Nois Já Tá Rico', artist: 'Mc IG, Mc Ryan SP, Orochi, DJ Glenner, DJ Negret' },
    { id: '3', title: 'Fernando de Noronha 2', artist: 'MC IG, MC Ryan SP, Murillo e LT no Beat' },
    { id: '4', title: 'Filha do Deputado', artist: 'Mc IG, Mc Ryan SP, DJ Glenner, Mc Poze do Rodo, Oruam' },
    { id: '5', title: 'Casal Celebridade', artist: 'Mc IG, Mc Ryan SP, DJ Glenner, Fepache' },
  ];

  const renderPlaylistItem = ({ item }) => (
    <View style={styles.playlistItem}>
      <Image source={item.cover} style={styles.playlistImage} />
      <Text style={styles.playlistTitle}>{item.title}</Text>
    </View>
  );

  const renderSuggestedItem = ({ item }) => (
    <View style={styles.playlistItem}>
      <Image source={item.cover} style={styles.playlistImage} />
      <Text style={styles.playlistTitle}>{item.title}</Text>
    </View>
  );

  const renderContinueListeningItem = ({ item }) => (
    <View style={styles.playlistItem}>
      <Image source={item.cover} style={styles.playlistImage} />
      <Text style={styles.playlistTitle}>{item.title}</Text>
    </View>
  );

  const openModal = (title) => {
    if (title === 'BadBoys') {
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.greeting}>Podcasts</Text>
        
      </View>

      
      <ScrollView contentContainerStyle={styles.contentContainer}>
        
        
        <Text style={styles.sectionTitle}>Continuar Escutando:</Text>
        <FlatList
          data={continueListening}
          renderItem={renderContinueListeningItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        
        <Text style={styles.sectionTitle}>Você Pode Gostar:</Text>
        <FlatList
          data={suggested}
          renderItem={renderSuggestedItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        <Text style={styles.sectionTitle}>Recomendados</Text>
        <FlatList
          data={playlists}
          renderItem={renderPlaylistItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </ScrollView>

      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Músicas do Álbum "BadBoys"</Text>
            <FlatList
              data={songs}
              renderItem={renderSuggestedItem}
              keyExtractor={(item) => item.id}
            />
            <Button title="Fechar" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
  },
  contentContainer: {
    paddingBottom: 20, 
    flexGrow: 1,  
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#121212', 
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', 
    flex: 1, 
    textAlign: 'center', 
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00A9E0', 
    marginHorizontal: 16,
    marginBottom: 10,
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
  playlistItem: {
    marginRight: 16,
    alignItems: 'center',
  },
  playlistImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#00A9E0', 
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
  },
  modalContainer: {
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
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00A9E0', 
    marginBottom: 10,
  },
});
