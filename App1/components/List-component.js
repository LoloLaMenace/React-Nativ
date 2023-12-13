import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, TextInput, FlatList, ImageComponent } from 'react-native';
import ItemObjectif from './itemView-component';

const ListObjectifs = ({ objectifs, handleRemoveObjectif }) => {
    return (
        <FlatList data={objectifs} 
          renderItem={({ item, index }) => (
            <ItemObjectif objectif={item} index={index} handleRemoveObjectif={handleRemoveObjectif} />
          )}
          keyExtractor={(item, index) => index.toString()} style={styles.container}
        />
    ); 
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 150
      },
});

export default ListObjectifs