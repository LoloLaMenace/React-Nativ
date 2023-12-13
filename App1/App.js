import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, TextInput, ImageComponent } from 'react-native';
import AddObjectif from './components/AddObjectif-component';
import ListObjectifs from './components/List-component';

export default function App() {
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
      
      {/* <View style={styles.container2}>
        <TextInput
          style={styles.input}
          placeholder="Enter vos objectifs"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <Pressable style={styles.button} onPress={handleAddObjectif}>
          <Text style={styles.Wtext}>AJOUTER</Text>
        </Pressable>
      </View> */}

      <AddObjectif inputValue={inputValue} setInputValue={setInputValue} setObjectifs={setObjectifs}/>

      {/* <View style={styles.container}>
        {objectifs.map((objectif, index) => (
          <View key={index} style={styles.objectifContainer}>
            <Text style={styles.textstyle}>{objectif}</Text>
            <Pressable onPress={() => handleRemoveObjectif(index)}>
              <Text style={[styles.deleteButton, styles.textstyle]}>❌</Text>
            </Pressable>
          </View>
        ))}
        <StatusBar style="auto" />
      </View> */}

      <ListObjectifs objectifs={objectifs} handleRemoveObjectif={handleRemoveObjectif}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 100
  },
  Wtext: {
    color: 'white'
  },
  container2: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 100,
  },
  input: {
    height: 50,
    width: '90%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 150,
    padding: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 150,
    backgroundColor: 'green',
    color: 'white'
  },
  objectifContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    fontSize: '150px'
  },
  textstyle: {
    fontSize: 20,
    marginBottom: 10
  },
  deleteButton: {
    color: 'red',
    marginLeft: 10,
  },
});