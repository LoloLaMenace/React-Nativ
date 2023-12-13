import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, TextInput, ImageComponent } from 'react-native';

const ItemObjectif = ({objectif, index, handleRemoveObjectif}) => {
    return(
        <View key={index} style={styles.objectifContainer}>
            <Text style={styles.textstyle}>{objectif}</Text>
            <Pressable onPress={() => handleRemoveObjectif(index)}>
                <Text style={[styles.deleteButton, styles.textstyle]}>X</Text>
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
        marginBottom: 10
      },
      deleteButton: {
        color: 'red',
        marginLeft: 10,
      },
});

export default ItemObjectif;