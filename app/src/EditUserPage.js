import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eblwtaeglbtxppddyygp.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibHd0YWVnbGJ0eHBwZGR5eWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NzQzNTMsImV4cCI6MjAyMjQ1MDM1M30.6t0_jPNYubLCPmEl8TrK8GCG8g4QRp1mSUejzcMLPH8";
const supabase = createClient(supabaseUrl, supabaseKey);

const EditUser = ({ navigation, isLoggedIn }) => {
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');
  const [mail, setMail] = useState('');
  const [photo, setPhoto] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
      console.error('Error fetching posts:', error.message);
    } else {
      setPosts(data);
    }
  };
  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', isLoggedIn)
        .single();

      if (error) {
        console.error('Error fetching post:', error.message);
        return;
      }

      if (data) {
        setUsername(data.username);
        setMail(data.mail);
        setPhoto(data.photo);
        setDescription(data.description);
      }
    } catch (error) {
      console.error('Error fetching post:', error.message);
    }
  };

  const handleUpdateUser = async () => {
    try {

      // Update user information in the database
      const { user, error } = await supabase
        .from('users')
        .update({ username, mail, photo, description })
        .eq('id', isLoggedIn); // Use the logged in user's id here

      if (error) {
        setError(error.message);
      } else {
        navigation.navigate('Home'); // Navigate back to home after successful update
      }
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Mail"
        value={mail}
        onChangeText={setMail}
      />
      <TextInput
        style={styles.input}
        placeholder="Photo"
        value={photo}
        onChangeText={setPhoto}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Update" onPress={handleUpdateUser} />
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

export default EditUser;
