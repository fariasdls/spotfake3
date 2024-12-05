import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const InitialScreen = ({ navigation }) => {
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000); // Navega para a tela 'Login' após 3 segundos
    return () => clearTimeout(splashTimer);
  }, [navigation]);

  return (
    <View style={styles.screenWrapper}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.appLogo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A2A3A',  // Alterei para um tom mais suave de azul escuro
  },
  appLogo: {
    width: 250,  // Aumentei o tamanho da logo para dar um destaque maior
    height: 250,
    borderRadius: 15,  // Adicionei um pequeno arredondamento nas bordas da logo
    borderWidth: 4,  // Borda ao redor da logo
    borderColor: '#F1C40F',  // Cor dourada para a borda da logo
    shadowColor: '#000',  // Sombras para dar um efeito de profundidade
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
});

export default InitialScreen;
