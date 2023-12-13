import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, TextInput, ImageBackground } from 'react-native';
import AddObjectif from './components/AddObjectif-component';
import ListObjectifs from './components/List-component';

export default function App() {
  const image = require('./assets/back.jpg');
  const [inputValue, setInputValue] = useState('');
  const [objectifs, setObjectifs] = useState([
    "Faire les courses",
    "Aller à la salle de sport 3 fois par semaine",
    "Monter à plus de 5000m d'altitude",
    "Acheter mon premier appartement"
  ]);

  const handleAddObjectif = () => {
    if (inputValue === '') {
      return;
    }
    setObjectifs((prevObjectifs) => [...prevObjectifs, inputValue]);
    setInputValue('');
  };

  const handleRemoveObjectif = (index) => {
    const updatedObjectifs = [...objectifs];
    updatedObjectifs.splice(index, 1);
    setObjectifs(updatedObjectifs);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <AddObjectif inputValue={inputValue} setInputValue={setInputValue} setObjectifs={setObjectifs}/>
        <ListObjectifs objectifs={objectifs} handleRemoveObjectif={handleRemoveObjectif}/>
      </ImageBackground>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});