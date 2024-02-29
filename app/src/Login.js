import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://eblwtaeglbtxppddyygp.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibHd0YWVnbGJ0eHBwZGR5eWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NzQzNTMsImV4cCI6MjAyMjQ1MDM1M30.6t0_jPNYubLCPmEl8TrK8GCG8g4QRp1mSUejzcMLPH8";

const supabase = createClient(supabaseUrl, supabaseKey);

// Login component for user authentication
const Login = ({ navigation, setIsLoggedIn }) => {
  // State variables for storing username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle user login
  const handleLogin = async () => {
    try {
      // Fetch user details from the database
      const { data: users } = await supabase.from('users').select('*').eq('username', username).limit(1).single();

      if (!users) {
        // Show error if user not found
        setError('User not found');
        return;
      }
      if (users.password !== password) {
        // Show error if incorrect password
        setError('Incorrect password');
        return;
      }
      setIsLoggedIn(users.id);
      // Store user ID in AsyncStorage
      await AsyncStorage.setItem('loggedInUserId', users.id.toString());
      navigation.navigate('Home'); // Navigate to home screen after successful login
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  // Function to navigate to the signup screen
  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    // View container for the login form
    <View style={styles.container}>
      {/* Input fields for username and password */}
      <Text style={styles.label}>Username</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} />
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      {/* Button to initiate login process */}
      <Button title="Login" onPress={handleLogin} style={styles.btn}/>
      {/* Button to navigate to signup screen */}
      <Button title="Signup" onPress={handleSignup} style={styles.btn}/>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  label: {
    color:'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default Login;