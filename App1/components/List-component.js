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
          keyExtractor={(item, index) => index.toString()} style={styles.containerList}
        />
    ); 
};

const styles = StyleSheet.create({
    containerList: {
        flex: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 100,
        marginBottom: 150,
      },
});

export default ListObjectifs