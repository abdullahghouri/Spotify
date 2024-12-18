import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, FlatList, ImageBackground, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Sample data for demonstration
const songs = [
  { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSeBsJElc77zYLFjqcMS1UFe3xclJkUxJcAQ&s' },
  { id: '2', title: 'Shape of You', artist: 'Ed Sheeran', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkBcHnkbQmOIp93z5vk9ihLtzPTml2FOGMcg&s' },
  { id: '3', title: 'Levitating', artist: 'Dua Lipa', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjjjrkWPE26Z87m_5CqoDP8gaapV22UM6MPA&s' },
  { id: '4', title: 'Nights', artist: 'Frank Ocean', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0sGzP3HMgDDPFXPnzkwzWN7nc7G3HC_ne_Q&s' },
  { id: '5', title: 'N.Y. State of Mind', artist: 'Nas', image: 'https://i.scdn.co/image/ab67616d0000b273045fc920ecf4f8094888ec26' },
  { id: '6', title: 'Life is Good', artist: 'Future', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiDaUsZk0WUD6jU3lxL3J--HkIV35PDcJpPw&s' },
  { id: '7', title: 'Gods Plan', artist: 'Drake', image: 'https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5' },
   { id: '8', title: 'Chanel', artist: 'Frank Ocean', image: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Frank_Ocean_Chanel_Cover.jpg' },
   { id: '9', title: 'Bring me to Life', artist: 'evanescence', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2Y4e9dIyKrvec9JYv6e48SGNWSHsoif_jww&s' },
   { id: '10', title: 'Psychosocial', artist: 'Slipknot', image: 'https://i.ytimg.com/vi/5abamRO41fE/maxresdefault.jpg' },
];

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>  
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={() => navigation.navigate('HomeTabs')} />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>  
      <Text style={styles.title}>Signup</Text>
      <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#999" />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#999" secureTextEntry />
      <Button title="Sign Up" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const HomeScreen = () => {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSongPress = (song) => {
    setNowPlaying(song);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={{ flex: 1 }}>  
      <ImageBackground
        source={{ uri: 'https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-10248.jpg?semt=ais_hybrid' }}
        style={styles.backgroundImage}
      >
        <View style={styles.songListContainer}>  
          <FlatList
            data={songs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSongPress(item)}>
                <View style={styles.songItem}>  
                  <Image source={{ uri: item.image }} style={styles.songImage} />
                  <View>
                    <Text style={styles.songTitle}>{item.title}</Text>
                    <Text style={styles.songArtist}>{item.artist}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ImageBackground>
      <View style={styles.musicPlayer}>  
        {nowPlaying && (
          <>
            <Text style={styles.playerText}>Now Playing: {nowPlaying.title} - {nowPlaying.artist}</Text>
            <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
              <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="#fff" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const SearchScreen = () => {
  return (
    <View style={styles.container}>  
      <Text style={styles.title}>Recommended Songs</Text>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>  
            <Text style={styles.text}>{item.title} - {item.artist}</Text>
          </View>
        )}
      />
    </View>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: '#222' },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#888',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  songListContainer: {
    flex: 1,
    padding: 16,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  songArtist: {
    color: '#bbb',
    fontSize: 14,
  },
  musicPlayer: {
    backgroundColor: '#222',
    padding: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playerText: {
    color: '#fff',
    fontSize: 14,
  },
  playButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
  },
  link: {
    color: '#1DB954',
    marginTop: 16,
    textAlign: 'center',
  },
  item: {
    padding: 16,
    backgroundColor: '#333',
    marginBottom: 8,
    borderRadius: 8,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
