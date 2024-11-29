import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, TextInput, Alert, TouchableOpacity, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [modalVisible, setModalVisible] = useState(false)
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [emailValue, setEmailValue] = useState('')


  const navigation = useNavigation();

  
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8000/get.users');
      if (response.ok) {
        const userData = await response.json();
        setName(userData.name);
        setEmail(userData.email);
        setBio(userData.bio);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar ao servidor.');
    }
  };

  useEffect(() => {
    
    const loadProfileImage = async () => {
      try {
        const savedImage = await AsyncStorage.getItem('profileImage');
        if (savedImage) {
          setProfileImage(savedImage);
        }
      } catch (error) {
        console.error("Erro ao carregar a imagem de perfil:", error);
      }
    };

    fetchUserData();
    loadProfileImage();  
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "Permita o acesso à galeria para selecionar uma imagem.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      
      await AsyncStorage.setItem('profileImage', result.assets[0].uri);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Perfil atualizado', 'Suas alterações foram salvas.');
  };

  const toggleTheme = () => {
    setIsLightTheme((prevTheme) => !prevTheme);
  };

  const themeStyles = {
    container: {
      backgroundColor: isLightTheme ? 'white' : 'black',
    },
    text: {
      color: isLightTheme ? 'black' : 'white',
    },
    button: {
      backgroundColor: isLightTheme ? '#DDDDDD' : '#444',
    },
  };

  const trocarSenha = () => {
    if(novaSenha.length < 3 ) {
      return alert('A senha deve conter pelo menos 3 caractéres')
    }
    if(novaSenha !== confirmarSenha) {
      return alert('As senhas devem coincidir')
    }
    try {
      console.log(emailValue)
      const resposta  = fetch(`http://localhost:8000/trocar_senha/${emailValue}`,{
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ senha: novaSenha })
});
console.log(resposta.status)
    fecharModal()
    } catch (error) {
      console.log(error)
    }
    
  }

  const fecharModal = () => {
    setConfirmarSenha('')
    setNovaSenha('')
    setModalVisible(false)
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
        setEmailValue(value)
      }
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    getData()
  },[])


  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <View style={styles.margem}>
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={profileImage ? { uri: profileImage } : require('../../assets/images/cinza.png')}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage} style={[styles.changePhotoButton, themeStyles.button]}>
            <Text style={[styles.changePhotoText, themeStyles.text]}>Alterar Foto</Text>
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              style={[styles.nameInput, themeStyles.text]}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          ) : (
            <Text style={[styles.name, themeStyles.text]}>{name}</Text>
          )}
          <Text style={[styles.email, themeStyles.text]}>{email}</Text>
        </View>

        <View style={styles.profileBody}>
          {isEditing ? (
            <TextInput
              style={[styles.bioInput, themeStyles.text]}
              value={bio}
              onChangeText={(text) => setBio(text)}
              multiline
            />
          ) : (
            <Text style={[styles.bio, themeStyles.text]}>{bio}</Text>
          )}
        </View>

        
        <View style={styles.buttonContainer}>
          {isEditing ? (
            <Button title="Salvar" onPress={handleSave} color="#a80000" />
          ) : (
            <Button title="Alterar Biografia" onPress={() => setIsEditing(true)} color="#66FCF1" />
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Voltar" onPress={() => navigation.goBack()} color="#66FCF1" />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Alterar Senha" onPress={() => setModalVisible(!modalVisible)} color="#66FCF1" />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={isLightTheme ? "Tema Escuro" : "Tema Claro"}
            onPress={toggleTheme}
            color={isLightTheme ? "#444" : "#888"}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Sair da Conta" onPress={() => navigation.navigate('Login')} color="#FF6347" />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>trocar senha</Text>
            <TextInput
              style={styles.inputField}
              placeholder="nova senha"
              placeholderTextColor="#666"
              value={novaSenha}
              onChangeText={setNovaSenha}
            />
            <TextInput
              style={styles.inputField}
              placeholder="confirmar senha"
              placeholderTextColor="#666"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />
            <TouchableOpacity style={styles.signUpButton} onPress={trocarSenha}>
              <Text style={styles.signUpButtonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signUpButton} onPress={fecharModal}>
              <Text style={styles.signUpButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  margem: {
    margin: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 100,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  nameInput: {
    fontSize: 22,
    fontWeight: 'bold',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
  },
  profileBody: {
    marginVertical: 10,
  },
  bio: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  bioInput: {
    fontSize: 16,
    lineHeight: 22,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginVertical: 15,
    width: '80%',
    alignSelf: 'center',
  },
  changePhotoButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 11,
    alignItems: 'center',
  },
  changePhotoText: {
    fontWeight: 'bold',
  },
  inputField: {
    width: '100%',
    height: 32,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: '#E5E5E5',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  modalView: {
    margin: 20,
    backgroundColor: '#212121',
    borderRadius: 20,
    padding: 25,
    paddingHorizontal: 45,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white'
  },
  signUpButton: {
    width: '100%',
    height: 32,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
