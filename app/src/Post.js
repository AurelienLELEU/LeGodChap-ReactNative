import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eblwtaeglbtxppddyygp.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibHd0YWVnbGJ0eHBwZGR5eWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NzQzNTMsImV4cCI6MjAyMjQ1MDM1M30.6t0_jPNYubLCPmEl8TrK8GCG8g4QRp1mSUejzcMLPH8"
const supabase = createClient(supabaseUrl, supabaseKey);


export default function Post(props) {
  const [publisher, setPublisher] = useState(null);
  const navigation = useNavigation(); // Get navigation object
  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
      console.error('Error fetching posts:', error.message);
    } else {
      props.setPosts(data);
    }
  };
  useEffect(() => {
    // Fetch publisher details
    const fetchPublisher = async () => {
      // Add a check for undefined
      if (props.publisherId !== undefined) {
        try {
          // Fetch publisher details from API
          const { data, error } = await supabase
            .from('users')
            .select('username')
            .eq('id', props.publisherId)
            .single();
          if (error) {
            console.error('Error fetching publisher:', error.message);
          } else {
            // Set publisher username
            setPublisher(data.username);
          }
        } catch (error) {
          console.error('Error fetching publisher:', error.message);
        }
      }
    };

    fetchPublisher();
  }, [props.publisherId]);

  const handleEdit = () => {
    // Navigate to the EditPostPage with postId as parameter
    console.log(props.postId);
    navigation.navigate('EditPostPage', { postId: props.postId });
  };

  const handleRemove = async () => {
    // Navigate to the EditPostPage with postId as parameter
    try {
      const { data, error } = await supabase
        .from('posts')
        .delete()
        .eq('id', props.postId);

      if (error) {
        console.error('Error updating post:', error.message);
        return;
      }
    } catch (error) {
      console.error('Error updating post:', error.message);
    }
    fetchPosts();
  };

  return (
    <View>
      <Card containerStyle={styles.card}>
        <View style={styles.imageContainer}>
          {props.image ? <Image source={{ uri: props.image }} style={styles.image} /> : null}
        </View>
        <Card.Divider />
        <Card.Title>{props.title}</Card.Title>
        <Text style={styles.content}>{props.content}</Text>
        {publisher && <Text style={styles.publisher}>Published by: {publisher}</Text>}
        {/* Button to edit post */}
        {props.isLoggedIn == props.publisherId ? 
        <>
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.editButton}>Edit Post</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRemove}>
            <Text style={styles.editButton}>remove Post</Text>
          </TouchableOpacity> 
          </> : null}

      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  content: {
    marginBottom: 10,
  },
  publisher: {
    marginBottom: 10,
    fontSize: 10,
    textAlign: 'right',
  },
  editButton: {
    alignSelf: 'flex-end',
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
