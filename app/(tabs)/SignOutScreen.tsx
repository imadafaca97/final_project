
import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignOutScreen = ({ onSignOut }: any) => {

  useEffect(() => {
    const signOut = async () => {
      await AsyncStorage.clear();
      onSignOut();
    };

    signOut();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cerrando sesión...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default SignOutScreen;
