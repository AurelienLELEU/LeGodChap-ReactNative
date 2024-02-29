// Import necessary components and modules from React and React Native
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { useNavigation } from '@react-navigation/native';

// Initialize Supabase client with URL and key
const supabaseUrl = 'https://eblwtaeglbtxppddyygp.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibHd0YWVnbGJ0eHBwZGR5eWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NzQzNTMsImV4cCI6MjAyMjQ1MDM1M30.6t0_jPNYubLCPmEl8TrK8GCG8g4QRp1mSUejzcMLPH8"
const supabase = createClient(supabaseUrl, supabaseKey);

// Functional component for editing a post
export default function EditPostPage({ navigation, route, posts, setPosts }) {
    // Extract postId from route parameters
    const { postId } = route.params;

    // State variables for post information
    const [titleFR, setTitleFR] = useState('');
    const [contentFR, setContentFR] = useState('');
    const [titleEN, setTitleEN] = useState('');
    const [contentEN, setContentEN] = useState('');
    const [image, setImage] = useState('');

    // Fetch post data from Supabase on component mount
    useEffect(() => {
        fetchPostData();
    }, []);

    // Function to fetch post data from Supabase
    const fetchPostData = async () => {
        try {
            // Fetch post data based on postId
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', postId)
                .single();

            if (error) {
                console.error('Error fetching post:', error.message);
                return;
            }

            if (data) {
                // Set post data in state variables
                setTitleFR(data.titleFR);
                setContentFR(data.descFR);
                setTitleEN(data.titleEN);
                setContentEN(data.descEN);
                setImage(data.image);
            }
        } catch (error) {
            console.error('Error fetching post:', error.message);
        }
    };

    // Function to fetch updated list of posts
    const fetchPosts = async () => {
        const { data, error } = await supabase.from('posts').select('*');
        if (error) {
            console.error('Error fetching posts:', error.message);
        } else {
            setPosts(data);
        }
    };

    // Function to handle post edit
    const handleEditPost = async () => {
        try {
            if (titleFR && contentFR) {
                // Update post information in the database
                const { data, error } = await supabase
                    .from('posts')
                    .update({
                        titleFR: titleFR,
                        titleEN: titleEN,
                        descFR: contentFR,
                        descEN: contentEN,
                        image: image,
                    })
                    .eq('id', postId);

                if (error) {
                    console.error('Error updating post:', error.message);
                    return;
                }
                fetchPosts(); // Fetch updated list of posts
                navigation.goBack(); // Navigate back to previous screen
            }
        } catch (error) {
            console.error('Error updating post:', error.message);
        }
    };

    // Render input fields for post information and edit button
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title FR (mandatory)</Text>
            <TextInput style={styles.input} value={titleFR} onChangeText={setTitleFR} />
            <Text style={styles.label}>Title EN</Text>
            <TextInput style={styles.input} value={titleEN} onChangeText={setTitleEN} />
            <Text style={styles.label}>Content FR (mandatory)</Text>
            <TextInput style={styles.input} multiline numberOfLines={4} value={contentFR} onChangeText={setContentFR} />
            <Text style={styles.label}>Content EN</Text>
            <TextInput style={styles.input} multiline numberOfLines={4} value={contentEN} onChangeText={setContentEN} />
            <Text style={styles.label}>Image (mandatory)</Text>
            <TextInput style={styles.input} value={image} onChangeText={setImage} />
            <Button title="Edit Post" onPress={handleEditPost} />
        </View>
    );
}

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
