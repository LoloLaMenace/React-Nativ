import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, TextInput, ImageComponent } from 'react-native';

const ItemObjectif = ({objectif, index, handleRemoveObjectif}) => {
    return(
        <View key={index} style={styles.objectifContainer}>
            <Text style={styles.textstyle}>{objectif}</Text>
            <Pressable onPress={() => handleRemoveObjectif(index)}>
                <Text style={styles.deleteButton}>X</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100
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
        marginBottom: 10,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
      },
      deleteButton: {
        fontSize: 20,
        color: 'red',
        marginLeft: 10,
        marginBottom: 10,
      },
});

export default ItemObjectif;