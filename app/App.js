import { View, Button, StyleSheet, Image, ScrollView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createClient } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';
import EditPostPage from './src/EditPostPage';
import NewPostPage from './src/NewPostPage';
import EditUser from './src/EditUserPage';
import Signup from './src/Signup';
import Login from './src/Login';
import FREN from './src/FREN';
import Post from './src/Post';


const supabaseUrl = 'https://eblwtaeglbtxppddyygp.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibHd0YWVnbGJ0eHBwZGR5eWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NzQzNTMsImV4cCI6MjAyMjQ1MDM1M30.6t0_jPNYubLCPmEl8TrK8GCG8g4QRp1mSUejzcMLPH8";
const supabase = createClient(supabaseUrl, supabaseKey);

const Stack = createStackNavigator();

export default function App() {
  const [language, setLanguage] = useState('FR');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState('');

  // Add this state to store the logged in user's id
  const [loggedInUserId, setLoggedInUserId] = useState('');

  // Fetch user info when logged in
  useEffect(() => {
    fetchUserInfo();
  }, [isLoggedIn]);

  const fetchUserInfo = async () => {
    // Fetch the logged in user's info and store the id
    const user = await AsyncStorage.getItem('userInfo');
    if (user) {
      setLoggedInUserId(JSON.parse(user).id);
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      console.log(isLoggedIn);
    } else {
      console.log("User is not logged in");
    }
  }, [isLoggedIn]);

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
      console.error('Error fetching posts:', error.message);
    } else {
      setPosts(data);
    }
  };

  const handleLogout = async () => {
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ title: 'Home', headerShown: false }}>
          {({ navigation }) => (
            <View style={styles.container}>
              <View style={styles.imgContainer}>
                <Image source={require('./img/LeGod-removebg-preview2.png')} style={styles.image} />
                <View style={styles.frenContainer}>
                  <FREN onLanguageChange={handleLanguageChange} />
                </View>
                {isLoggedIn && (
                  <>
                    <Button title="New Post" onPress={() => navigation.navigate('NewPost')} />
                    {/* Add button to navigate to EditUser component */}
                    <Button title="Edit User" onPress={() => navigation.navigate('EditUser')} />
                  </>
                )}
                <Button title={isLoggedIn ? "Logout" : "Login"} onPress={() => {
                  if (isLoggedIn) {
                    handleLogout();
                  } else {
                    navigation.navigate('Login');
                  }
                }} />
              </View>
              <ScrollView>
                {posts && posts.map((post, index) => (
                  <Post key={index} title={language === 'FR' ? post.titleFR : post.titleEN} content={language === 'FR' ? post.descFR : post.descEN} image={post.image} publisherId={post.publisherId} postId={post.id} posts={posts} setPosts={setPosts} isLoggedIn={isLoggedIn} />
                ))}
              </ScrollView>
              <StatusBar />
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="NewPost" options={{ title: 'NewPost', headerShown: false }}>
          {({ navigation }) => <NewPostPage navigation={navigation} publisherId={isLoggedIn} posts={posts} setPosts={setPosts} />}
        </Stack.Screen>
        {/* <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup', headerShown: false }} /> */}
        <Stack.Screen name="Signup" options={{ title: 'Signup', headerShown: false }}>
          {({ navigation }) => <Signup navigation={navigation} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Login" options={{ title: 'Login', headerShown: false }}>
          {({ navigation }) => <Login navigation={navigation} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="EditPostPage" options={{ title: 'EditPostPage', headerShown: false }}>
          {({ navigation, route }) => <EditPostPage navigation={navigation} route={route} posts={posts} setPosts={setPosts} />}
        </Stack.Screen>
        <Stack.Screen name="EditUser" options={{ title: 'EditUser', headerShown: false }}>
          {({ navigation }) => <EditUser navigation={navigation} isLoggedIn={isLoggedIn} posts={posts} setPosts={setPosts} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B',
  },
  imgContainer: {
    flexDirection: 'row',
    paddingTop: 40,
    paddingBottom: 10,
    width: '100%',
    height: 90,
    backgroundColor: 'black',
  },
  image: {
    width: 150,
    height: '100%',
    resizeMode: 'contain',
  },
  frenContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
});
