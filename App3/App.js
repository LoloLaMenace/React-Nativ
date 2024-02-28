import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Page d'accueil</Text>
    </View>
  );
}

function CategorieScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Page de catégorie</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function NavBar({ navigation }) {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Accueil')}>
        <Text style={styles.navText}>Accueil</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Categorie')}>
        <Text style={styles.navText}>Categorie</Text>
      </TouchableOpacity>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Categorie" component={CategorieScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      <NavBar />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222',
  },
  text: {
    color: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#111',
    position: 'absolute',
    bottom: 0,
    height: 70,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  navText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff'
  },
});

export default App;
