import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eblwtaeglbtxppddyygp.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibHd0YWVnbGJ0eHBwZGR5eWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NzQzNTMsImV4cCI6MjAyMjQ1MDM1M30.6t0_jPNYubLCPmEl8TrK8GCG8g4QRp1mSUejzcMLPH8"
const supabase = createClient(supabaseUrl, supabaseKey);



// Post component
export default function Post(props) {
  const [publisher, setPublisher] = useState(null); // State variable for storing publisher username
  const navigation = useNavigation(); // Get navigation object

  // Function to fetch posts from the database
  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
      console.error('Error fetching posts:', error.message);
    } else {
      props.setPosts(data);
    }
  };

  // Effect hook to fetch publisher details when props.publisherId changes
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

  // Function to handle editing a post
  const handleEdit = () => {
    // Navigate to the EditPostPage with postId as parameter
    navigation.navigate('EditPostPage', { postId: props.postId });
  };

  // Function to handle removing a post
  const handleRemove = async () => {
    try {
      // Delete the post from the database
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
    fetchPosts(); // Fetch updated posts after removing one
  };

  return (
    <View>
      {/* Card component to display post */}
      <Card containerStyle={styles.card}>
        {/* Display post image if available */}
        <View style={styles.imageContainer}>
          {props.image ? <Image source={{ uri: props.image }} style={styles.image} /> : null}
        </View>
        <Card.Divider />
        {/* Display post title and content */}
        <Card.Title>{props.title}</Card.Title>
        <Text style={styles.content}>{props.content}</Text>
        {/* Display publisher username and publication date */}
        {publisher && <Text style={styles.publisher}>Published by: {publisher} on {props.createdAt}</Text>}
        {/* Display edit and remove post options for the logged-in user */}
        {props.isLoggedIn == props.publisherId ? 
        <>
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.editButton}>Edit Post</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRemove}>
            <Text style={styles.editButton}>Remove Post</Text>
          </TouchableOpacity> 
          </> : null}
      </Card>
    </View>
  );
}

// Styles for the component
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