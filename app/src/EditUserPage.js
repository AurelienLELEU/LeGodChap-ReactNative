// Import necessary components and modules from React and React Native
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Supabase client with URL and key
const supabaseUrl = 'https://eblwtaeglbtxppddyygp.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibHd0YWVnbGJ0eHBwZGR5eWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NzQzNTMsImV4cCI6MjAyMjQ1MDM1M30.6t0_jPNYubLCPmEl8TrK8GCG8g4QRp1mSUejzcMLPH8";
const supabase = createClient(supabaseUrl, supabaseKey);

// Functional component for editing user information
const EditUser = ({ navigation, isLoggedIn, setIsLoggedIn, posts, setPosts }) => {
  // State variables for user information
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');
  const [mail, setMail] = useState('');
  const [photo, setPhoto] = useState('');

  // Fetch user data from Supabase on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Function to fetch user data from Supabase
  const fetchUserData = async () => {
    try {
      // Fetch user data based on the logged-in user's ID
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', isLoggedIn)
        .single();

      if (error) {
        console.error('Error fetching user data:', error.message);
        return;
      }

      if (data) {
        // Set user data in state variables
        setUsername(data.username);
        setMail(data.mail);
        setPhoto(data.photo);
        setDescription(data.description);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  // Function to handle user logout
  const handleLogout = async () => {
    setIsLoggedIn(false); // Set isLoggedIn state to false
    await AsyncStorage.removeItem('loggedInUserId'); // Remove user ID from AsyncStorage
  };

  // Function to handle user account removal
  const handleRemove = async () => {
    try {
      // Delete user account from Supabase
      const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', isLoggedIn);

      if (error) {
        console.error('Error removing user account:', error.message);
        return;
      }

      // Logout user and navigate to Home screen
      handleLogout();
      fetchPosts(); // Fetch updated list of posts
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error removing user account:', error.message);
    }
  };

  // Function to handle user information update
  const handleUpdateUser = async () => {
    try {
      if (username && mail) {
        // Update user information in the database
        const { user, error } = await supabase
          .from('users')
          .update({ username, mail, photo, description })
          .eq('id', isLoggedIn); // Use the logged-in user's id here

        if (error) {
          console.error('Error updating user:', error.message);
          return;
        }

        // Fetch updated list of posts and navigate to Home screen
        fetchPosts();
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  // Render user information input fields and buttons
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username (mandatory)</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Mail (mandatory)</Text>
      <TextInput
        style={styles.input}
        placeholder="Mail"
        value={mail}
        onChangeText={setMail}
      />
      <Text style={styles.label}>Photo</Text>
      <TextInput
        style={styles.input}
        placeholder="Photo"
        value={photo}
        onChangeText={setPhoto}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Update" onPress={handleUpdateUser} />
      <Button title="Remove account" onPress={handleRemove} />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  label: {
    color: 'white',
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
});

// Export the EditUser component as default
export default EditUser;
