import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerHandler = async () => {
    if (password !== confirmPassword) {
      window.alert('ERRO: As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/registro', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: firstName,
          sobrenome: lastName,
          dataNascimento: birthDate,
          email: email,
          senha: password,
        }),
      });

      if (response.status === 400) {
        window.alert('ERRO: Usuário já cadastrado!');
      } else if (response.status === 406) {
        window.alert('ERRO: Preencha todos os campos!');
      } else if (response.status === 201) {
        navigation.navigate('Login');
      } else {
        window.alert('ERRO: Ocorreu um erro inesperado');
      }
    } catch (error) {
      window.alert('ERRO: Não foi possível conectar ao servidor');
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.headerText}>CRIAR CONTA</Text>

      <TextInput
        style={styles.inputField}
        placeholder="Nome"
        placeholderTextColor="#B0B0B0"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Sobrenome"
        placeholderTextColor="#B0B0B0"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Data de Nascimento (DD/MM/AAAA)"
        placeholderTextColor="#B0B0B0"
        keyboardType="numeric"
        value={birthDate}
        onChangeText={setBirthDate}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Email"
        placeholderTextColor="#B0B0B0"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Senha"
        placeholderTextColor="#B0B0B0"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Confirmar Senha"
        placeholderTextColor="#B0B0B0"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.signUpButton} onPress={registerHandler}>
        <Text style={styles.signUpButtonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.alreadyMemberText}>Já tem uma conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E3A59', // Changed to a darker background color
    padding: 20,
  },
  logo: {
    width: 140, // Slightly larger logo
    height: 110, // Adjusted height
    marginBottom: 20,
  },
  headerText: {
    fontSize: 30, // Slightly larger text size
    fontWeight: '700', // Bold header
    color: '#FF6347', // Changed to a warm color for better contrast
    marginBottom: 30, // Increased bottom margin for spacing
  },
  inputField: {
    width: '100%',
    height: 40, // Slightly taller input fields
    backgroundColor: '#3E4A59', // Darker background for input fields
    borderRadius: 12, // Rounded corners
    paddingHorizontal: 16,
    marginBottom: 18, // Increased spacing between input fields
    color: '#F0F0F0', // Light text color for contrast
  },
  signUpButton: {
    width: '100%',
    height: 45, // Increased button height
    backgroundColor: '#FF6347', // Changed to a red-orange button color
    borderRadius: 10, // Rounded corners for the button
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15, // Increased bottom margin
  },
  signUpButtonText: {
    fontSize: 18, // Larger text on the button
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  alreadyMemberText: {
    fontSize: 16,
    color: '#F0F0F0', // Lighter color for text
    textAlign: 'center',
    marginTop: 15, // Increased top margin for spacing
  },
});

export default SignUpScreen;
