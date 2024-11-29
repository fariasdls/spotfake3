import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async () => {
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          senha: password,
        }),
      });

      if (response.status === 404) {
        alert('ERRO: Usuário não cadastrado!');
        return;
      } else if (response.status === 406) {
        alert('ERRO: Preencha todos os campos!');
        return;
      } else if (response.status === 403) {
        alert('ERRO: Senha incorreta!');
        return;
      } else if (response.status === 200) {
        storeData(email)
        navigation.navigate('Home');
      } else {
        alert('ERRO: Resposta desconhecida do servidor');
        return;
      }
    } catch (error) {
      alert('ERRO: Não foi possível conectar ao servidor');
      return;
    }
  };

  const storeData = async (value) => {
    try {
      console.log(value)
      await AsyncStorage.setItem('email', value);
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <View style={styles.screenContainer}>
      
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      
      <Text style={styles.heading}>Acessar Conta</Text>
      
      <TextInput
        style={styles.inputField}
        placeholder="Digite seu email"
        placeholderTextColor="#666"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Digite sua senha"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={loginHandler}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signUpText}>Ainda não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#101820',
    padding: 20,
  },
  logo: {
    width: 150, 
    height: 150, 
    marginBottom: 30, 
  },
  heading: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1E90FF', 
    marginBottom: 20,
  },
  inputField: {
    width: '100%',
    height: 48,
    backgroundColor: '#1D1D1D',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 18,
    color: '#E5E5E5',
  },
  loginButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  signUpText: {
    fontSize: 16,
    color: '#1E90FF',
    textAlign: 'center',
  },
});

export default LoginScreen;
