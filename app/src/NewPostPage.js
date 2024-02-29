import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import axios for making HTTP requests

const supabaseUrl = 'https://eblwtaeglbtxppddyygp.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibHd0YWVnbGJ0eHBwZGR5eWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NzQzNTMsImV4cCI6MjAyMjQ1MDM1M30.6t0_jPNYubLCPmEl8TrK8GCG8g4QRp1mSUejzcMLPH8"
const supabase = createClient(supabaseUrl, supabaseKey);

// NewPostPage component for creating a new post
export default function NewPostPage({ navigation, publisherId, setPosts }) {
  // State variables for storing post details
  const [image, setImage] = useState('');
  const [titleFR, setTitleFR] = useState('');
  const [contentFR, setContentFR] = useState('');
  const [titleEN, setTitleEN] = useState('');
  const [contentEN, setContentEN] = useState('');

  // Function to fetch posts from the database
  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
      console.error('Error fetching posts:', error.message);
    } else {
      setPosts(data);
    }
  };

  // Function to handle creating a new post
  const handleCreatePost = async () => {
    const currentDate = new Date();
    try {
      // Insert new post into the database
      const { error } = await supabase.from('posts').insert([
        {
          titleFR: titleFR,
          titleEN: titleEN,
          image: image,
          descFR: contentFR,
          descEN: contentEN,
          publisherId: Number(publisherId),
          created_at: currentDate.toDateString(),
        },
      ]);
      if (error){
        console.log(error);
      }
      fetchPosts(); // Fetch updated posts after creating a new one
      navigation.goBack(); // Navigate back after creating the post
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  return (
    // View container for the new post form
    <View style={styles.container}>
      {/* Input fields for title, content, and image of the post */}
      <Text style={styles.label}>Title FR (mandatory)</Text>
      <TextInput style={styles.input} value={titleFR} onChangeText={setTitleFR} />
      <Text style={styles.label}>Title EN</Text>
      <TextInput style={styles.input} value={titleEN} onChangeText={setTitleEN} />
      <Text style={styles.label}>Content FR (mandatory)</Text>
      <TextInput style={styles.input} multiline numberOfLines={4} value={contentFR} onChangeText={setContentFR} />
      <Text style={styles.label}>Content EN</Text>
      <TextInput style={styles.input} multiline numberOfLines={4} value={contentEN} onChangeText={setContentEN} />
      <Text style={styles.label}>Image</Text>
      <TextInput style={styles.input} value={image} onChangeText={setImage} />
      {/* Button to create the post */}
      <Button title="Create Post" onPress={handleCreatePost} />
    </View>
  );
}

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