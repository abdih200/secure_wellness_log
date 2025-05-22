import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Dashboard({ navigation }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (!storedToken) {
        navigation.replace('Login'); 
      } else {
        setToken(storedToken); 
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      {token ? (
        <>
          {/*
  <Text style={styles.token}>Your Token:</Text>
  <Text style={styles.tokenText}>{token}</Text>
*/}
        </>
      ) : (
        <Text>Checking authentication...</Text>
      )}
      <Button title="Logout" onPress={handleLogout} />
      <View style={{ marginTop: 10 }}>
        <Button
          title="Go to Wellness Log"
          onPress={() => navigation.navigate('Health')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  token: {
    fontSize: 16,
    marginBottom: 10
  },
  tokenText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center'
  }
});
