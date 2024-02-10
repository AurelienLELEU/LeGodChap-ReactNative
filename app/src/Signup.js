import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import React, { useState } from 'react';

const supabaseUrl = 'https://eblwtaeglbtxppddyygp.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibHd0YWVnbGJ0eHBwZGR5eWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NzQzNTMsImV4cCI6MjAyMjQ1MDM1M30.6t0_jPNYubLCPmEl8TrK8GCG8g4QRp1mSUejzcMLPH8"
const supabase = createClient(supabaseUrl, supabaseKey);

const Signup = ({ navigation, setIsLoggedIn }) => {
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const { data: users, error } = await supabase.from('users').select('*').eq('username', username).limit(1).single();

      if (!users) {
        setError('User not found');
        return;
      }
      if (users.password !== password) {
        setError('Incorrect password');
        return;
      }
      setIsLoggedIn(users.id);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('Error logging in');
    }
  };

  const handleSignup = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); //supprime les données de user stockées pour ne pas avoir de double login

      const { user, error } = await supabase.from('users').insert({
        username: username,
        mail: email,
        password: password,
        image: photo,
        description: description,
      });

      if (error) {
        setError(error.message);
      } else {
        await AsyncStorage.setItem('userInfo', JSON.stringify({ //stocke les données du user connecté
          username: username,
          mail: email,
          photo: photo,
          description: description,
        }));
        handleLogin();
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Photo" value={photo} onChangeText={setPhoto} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <Button title="Submit" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default Signup;
