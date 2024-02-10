import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { useNavigation } from '@react-navigation/native';

const supabaseUrl = 'https://eblwtaeglbtxppddyygp.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibHd0YWVnbGJ0eHBwZGR5eWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NzQzNTMsImV4cCI6MjAyMjQ1MDM1M30.6t0_jPNYubLCPmEl8TrK8GCG8g4QRp1mSUejzcMLPH8"
const supabase = createClient(supabaseUrl, supabaseKey);

export default function EditPostPage({ navigation, route, posts, setPosts }) {
    const { postId } = route.params;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        fetchPostData();
    }, []);

    const fetchPostData = async () => {
        try {
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
                setTitle(data.title);
                setContent(data.descFR); // Assuming 'descFR' is the field containing content
                setImage(data.image);
            }
        } catch (error) {
            console.error('Error fetching post:', error.message);
        }
    };

    const handleEditPost = async () => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .update({
                    titleFR: title,
                    descFR: content,
                    image: image,
                })
                .eq('id', postId);

            if (error) {
                console.error('Error updating post:', error.message);
                return;
            }

            // Update posts state after successful edit
            const updatedPosts = posts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        titleFR: title,
                        descFR: content,
                        image: image
                    };
                }
                return post;
            });
            setPosts(updatedPosts);

            navigation.goBack();
        } catch (error) {
            console.error('Error updating post:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Content"
                multiline
                numberOfLines={4}
                value={content}
                onChangeText={setContent}
            />
            <TextInput
                style={styles.input}
                placeholder="Image"
                multiline
                value={image}
                onChangeText={setImage}
            />
            <Button title="Edit Post" onPress={handleEditPost} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B1B1B',
        padding: 20,
        paddingTop: 40,
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
