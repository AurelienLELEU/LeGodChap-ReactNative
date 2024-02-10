import { View, TextInput, Button, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';

const supabaseUrl = 'https://eblwtaeglbtxppddyygp.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibHd0YWVnbGJ0eHBwZGR5eWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NzQzNTMsImV4cCI6MjAyMjQ1MDM1M30.6t0_jPNYubLCPmEl8TrK8GCG8g4QRp1mSUejzcMLPH8"
const supabase = createClient(supabaseUrl, supabaseKey);

export default function NewPostPage({ navigation, publisherId, posts, setPosts }) {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
      console.error('Error fetching posts:', error.message);
    } else {
      setPosts(data);
    }
  };

  const handleCreatePost = async () => {
    try {
      const { data, error } = await supabase.from('posts').insert([ //insert => ajouter en bdd
        {
          titleFR: title,
          titleEN: title,
          image: image,
          descFR: content,
          descEN: content,
          publisherId: Number(publisherId),
        },
      ]);
      console.log(Number(publisherId));
      fetchPosts();
      navigation.goBack();
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Content" multiline numberOfLines={4} value={content} onChangeText={setContent} />
      <TextInput style={styles.input} placeholder="Image" multiline value={image} onChangeText={setImage} />
      <Button title="Create Post" onPress={handleCreatePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B',
    padding: 20,
    paddingTop: 40
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
