import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const InitialScreen = ({ navigation }) => {
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
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
    backgroundColor: '#0B0C10',
  },
  appLogo: {
    width: 220,
    height: 220,
  },
});

export default InitialScreen;