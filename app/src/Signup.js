import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import React, { useState } from 'react';

const supabaseUrl = 'https://eblwtaeglbtxppddyygp.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibHd0YWVnbGJ0eHBwZGR5eWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NzQzNTMsImV4cCI6MjAyMjQ1MDM1M30.6t0_jPNYubLCPmEl8TrK8GCG8g4QRp1mSUejzcMLPH8"
const supabase = createClient(supabaseUrl, supabaseKey);


// Signup component
const Signup = ({ navigation, setIsLoggedIn }) => {
  // State variables initialization
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [error, setError] = useState(null); // State variable for error handling

  // Function to handle login
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
      console.error('Error during login:', error.message);
    }
  };

  // Function to handle signup
  const handleSignup = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Remove any existing user token
      if (username && password && email) { // Check if required fields are filled

        // Check if the username or email already exists in the database
        const { data: existingUsers, error: fetchError } = await supabase
          .from('users')
          .select('username, mail')
          .or(`username.eq.${username},mail.eq.${email}`)
          .single();

        if (fetchError) {
          setError(fetchError.message); // Set error if there is an error fetching existing users
          return;
        }

        if (existingUsers) {
          // If username or email is already taken, show an alert message
          if (existingUsers.username === username || existingUsers.mail === email) {
            Alert.alert('Username or Email is already taken');
          }
          return;
        }

        // If username and email are not taken, proceed with signup
        const { user, error } = await supabase.from('users').insert({
          username: username,
          mail: email,
          password: password,
          image: photo,
          description: description,
        });

        if (error) {
          setError(error.message); // Set error if there is an error during signup
        } else {
          await AsyncStorage.setItem('userInfo', JSON.stringify({ // Store user info
            username: username,
            mail: email,
            photo: photo,
            description: description,
          }));
          handleLogin(); // Log in the user after successful signup
        }
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Input fields for username, password, email, photo, and description */}
      <Text style={styles.label}>Username (mandatory)</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} />
      <Text style={styles.label}>Password (mandatory)</Text>
      <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      <Text style={styles.label}>Email (mandatory)</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text style={styles.label}>Photo (link)</Text>
      <TextInput style={styles.input} value={photo} onChangeText={setPhoto} />
      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />
      {/* Submit button to trigger signup */}
      <Button title="Submit" onPress={handleSignup} />
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
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default Signup;
