import { Text, View, Button, StyleSheet, Image, ScrollView, StatusBar, TextInput } from 'react-native';
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

const Stack = createStackNavigator(); // Stack Navigator for navigation

export default function App() {
  // State variables initialization
  const [language, setLanguage] = useState('FR');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState('');
  const [filter, setFilter] = useState('');
  const [sortTitle, setSortTitle] = useState('');
  const [sortDate, setSortDate] = useState('');

  // Fetch user info on component mount and login status change
  useEffect(() => {
    fetchUserInfo();
  }, [isLoggedIn]);

  // Fetch all posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to handle language change
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  // Function to fetch user info from AsyncStorage
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

  // Function to handle logout
  const handleLogout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem('loggedInUserId');
  };

  // Function to fetch posts from Supabase
  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
      console.error('Error fetching posts:', error.message);
    } else {
      setPosts(data);
    }
  };

  // Function to sort posts by recent
  function sortByRecent() {
    const sortedPosts = [...posts].sort((a, b) => b.id - a.id);
    setPosts(sortedPosts);
    setSortDate(1);
  }

  // Function to sort posts by oldest
  function sortByOldest() {
    const sortedPosts = [...posts].sort((a, b) => a.id - b.id);
    setPosts(sortedPosts);
    setSortDate(0);
  }

  // Function to sort posts by title in ascending order (FR)
  function sortByTitleFRAsc() {
    const sortedPosts = [...posts].sort((a, b) => a.titleFR.localeCompare(b.titleFR));
    setPosts(sortedPosts);
    setSortTitle(0);
  }

  // Function to sort posts by title in descending order (FR)
  function sortByTitleFRDesc() {
    const sortedPosts = [...posts].sort((a, b) => b.titleFR.localeCompare(a.titleFR));
    setPosts(sortedPosts);
    setSortTitle(1);
  }

  // Function to sort posts by title in ascending order (EN)
  function sortByTitleENAsc() {
    const sortedPosts = [...posts].sort((a, b) => a.titleEN.localeCompare(b.titleEN));
    setPosts(sortedPosts);
    setSortTitle(0);
  }

  // Function to sort posts by title in descending order (EN)
  function sortByTitleENDesc() {
    const sortedPosts = [...posts].sort((a, b) => b.titleEN.localeCompare(a.titleEN));
    setPosts(sortedPosts);
    setSortTitle(1);
  }


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

  const SvgCalendarDown = ({ onPress }) => (
    <TouchableOpacity style={styles.svg} onPress={onPress}>
      <Svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-calendar-date" viewBox="0 0 16 16">
        <Path d="M6.445 11.688V6.354h-.633A13 13 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23" />
        <Path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
      </Svg>
      <Svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
        <Path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4" />
      </Svg>
    </TouchableOpacity>
  );

  const SvgCalendarUp = ({ onPress }) => (
    <TouchableOpacity style={styles.svg} onPress={onPress}>
      <Svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-calendar-date" viewBox="0 0 16 16">
        <Path d="M6.445 11.688V6.354h-.633A13 13 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23" />
        <Path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
      </Svg>
      <Svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-arrow-up-short" viewBox="0 0 16 16">
        <Path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
      </Svg>
    </TouchableOpacity>
  );

  const BtnAaDown = ({ onPress }) => (
    <TouchableOpacity style={styles.svg} onPress={onPress}>
      <Text style={styles.Aa}>Aa</Text>
      <Svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
        <Path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4" />
      </Svg>
    </TouchableOpacity>
  );

  const BtnAaUp = ({ onPress }) => (
    <TouchableOpacity style={styles.svg} onPress={onPress}>
      <Text style={styles.Aa}>Aa</Text>
      <Svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-arrow-up-short" viewBox="0 0 16 16">
        <Path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
      </Svg>
    </TouchableOpacity>
  );

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
                  {isLoggedIn ? (
                    <SvgIconLogout onPress={() => { handleLogout(); }} />
                  ) : (
                    <SvgIconLogin onPress={() => { navigation.navigate('Login'); }} />
                  )}
                </View>
              </View>
              <View style={styles.imgContainer2}>
                <View style={styles.imgContainer2}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    onChangeText={(text) => setFilter(text)}
                  />
                </View>
              </View>
              <View style={styles.imgContainer2}>
                <View style={styles.imgContainer2}>
                  {sortDate ? (
                    <View>
                      <SvgCalendarDown onPress={sortByOldest} />
                    </View>
                  ) : (
                    <View>
                      <SvgCalendarUp onPress={sortByRecent} />
                    </View>
                  )}
                  {language === 'FR' ? (
                    sortTitle ? (
                      <View>
                        <BtnAaUp onPress={sortByTitleFRAsc} />
                      </View>
                    ) : (
                      <View>
                        <BtnAaDown onPress={sortByTitleFRDesc} />
                      </View>
                    )
                  ) : (
                    sortTitle ? (
                      <View>
                        <BtnAaUp onPress={sortByTitleENAsc} />
                      </View>
                    ) : (
                      <View>
                        <BtnAaDown onPress={sortByTitleENDesc} />
                      </View>
                    )
                  )
                  }
                </View>
              </View>
              <ScrollView>
                {posts &&
                  posts
                    .filter((post) => {
                      const title = language === 'FR' ? post.titleFR : post.titleEN;
                      const content = language === 'FR' ? post.descFR : post.descEN;
                      return title.toLowerCase().includes(filter.toLowerCase()) || content.toLowerCase().includes(filter.toLowerCase());
                    })
                    .map((post, index) => (
                      <Post
                        key={index}
                        title={language === 'FR' ? post.titleFR : post.titleEN}
                        content={language === 'FR' ? post.descFR : post.descEN}
                        image={post.image}
                        publisherId={post.publisherId}
                        createdAt={post.created_at}
                        postId={post.id}
                        posts={posts}
                        setPosts={setPosts}
                        isLoggedIn={isLoggedIn}
                        filter={filter}
                      />
                    ))}
              </ScrollView>
              <StatusBar />
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="NewPost" options={{ title: 'NewPost', headerShown: false }}>
          {({ navigation }) => <NewPostPage navigation={navigation} publisherId={isLoggedIn} posts={posts} setPosts={setPosts} />}
        </Stack.Screen>
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
  Aa: {
    color: 'white',
  },
  svg: {
    color: 'white',
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
  imgContainer2: {
    flexDirection: 'row',
    paddingBottom: 10,
    width: '100%',
    height: 50,
    backgroundColor: 'black',
    justifyContent: "center",
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
  searchInput: {
    flex: 1,
    height: '100%',
    maxWidth: '70%',
    color: 'white',
    paddingHorizontal: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
});
