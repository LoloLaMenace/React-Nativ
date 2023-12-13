import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';

const AddObjectif = ({ inputValue, setInputValue, setObjectifs }) => {
    const handleAddObjectif = () => {
        if (inputValue === '') {
            return;
        }
        setObjectifs((prevObjectifs) => [...prevObjectifs, inputValue]);
        setInputValue('');
    };
    return(
        <View style={styles.container2}>
            <TextInput style={styles.input} placeholder='Entrez vos objectifs' value={inputValue} onChangeText={(text) => setInputValue(text)}/>
            <Pressable style={styles.button} onPress={handleAddObjectif}>
                <Text style={styles.Wtext}>AJOUTER</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
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
    },
    Wtext: {
        color: 'white'
    }
  });
export default AddObjectif;