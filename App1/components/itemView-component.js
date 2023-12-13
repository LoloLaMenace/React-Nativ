import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, TextInput, ImageComponent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ItemObjectif = ({objectif, index, handleRemoveObjectif}) => {
    return(
        <View key={index} style={styles.objectifContainer}>
            <Text style={styles.textstyle}>{objectif}</Text>
             <Icon name='delete' onPress={() => handleRemoveObjectif(index)} style={styles.deleteButton}/>
        </View>
    )
};

const styles = StyleSheet.create({
      objectifContainer: {
        flexDirection: 'row',
        marginBottom: 8,
      },
      textstyle: {
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 10,
        color: 'white',
      },
      deleteButton: {
        fontSize: 20,
        color: 'red',
        marginLeft: 20,
        marginBottom: 10,
      },
});

export default ItemObjectif;