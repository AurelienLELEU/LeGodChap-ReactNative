import { View, Button, StyleSheet, Image, ScrollView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createClient } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import EditPostPage from './src/EditPostPage';
import Svg, { Path } from 'react-native-svg';
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

  useEffect(() => {
    fetchUserInfo();
  }, [isLoggedIn]);

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

  const SvgIconNewPost = ({ onPress }) => (
    <TouchableOpacity style={styles.svg} onPress={onPress}>
      <Svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" fill="white" viewBox="0 0 16 16">
        <Path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
        <Path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
      </Svg>
    </TouchableOpacity>
  );

  const SvgIconLogin = ({ onPress }) => (
    <TouchableOpacity style={styles.svg} onPress={onPress}>
      <Svg xmlns="http://www.w3.org/2000/svg" width="32" height="28" fill="white" class="bi bi-person" viewBox="0 0 16 16">
        <Path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
      </Svg>
    </TouchableOpacity>
  );

  const SvgIconEditProfile = ({ onPress }) => (
    <TouchableOpacity style={styles.svg} onPress={onPress}>
      <Svg xmlns="http://www.w3.org/2000/svg" width="32" height="28" fill="white" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
        <Path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
      </Svg>
    </TouchableOpacity>
  );

  const SvgIconLogout = ({ onPress }) => (
    <TouchableOpacity style={styles.svg} onPress={onPress}>
      <Svg xmlns="http://www.w3.org/2000/svg" width="32" height="28" fill="white" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
        <Path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
        <Path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
      </Svg>
    </TouchableOpacity>
  );

  const fetchUserInfo = async () => {
    try {
      const userId = await AsyncStorage.getItem('loggedInUserId');
      if (userId) {
        setIsLoggedIn(userId);
      }
    } catch (error) {
      console.error('Error fetching logged-in user ID:', error.message);
    }
  };

  const handleLogout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('loggedInUserId');
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
                  {isLoggedIn && (
                    <>
                      <SvgIconNewPost onPress={() => navigation.navigate('NewPost')} />
                      <SvgIconEditProfile onPress={() => navigation.navigate('EditUser')} />
                    </>
                  )}
                  {isLoggedIn ? <>
                    <SvgIconLogout onPress={() => { handleLogout(); }} />
                  </> : <>
                    <SvgIconLogin onPress={() => { navigation.navigate('Login'); }} />
                  </>}
                </View>

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
          {({ navigation }) => <EditUser navigation={navigation} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} posts={posts} setPosts={setPosts} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  svg: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
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
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
});
