import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, TextInput, ImageComponent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ConfirmModal from '../modals/confirmDelete-Modal';

const ItemObjectif = ({objectif, index, handleRemoveObjectif}) => {
    const [visible, setModalVisible] = useState(false)

    const openModal = () => {
      setModalVisible(!visible);
    }

    const closeModal = () => {
      setModalVisible(false);
    }

    const handleDeletePress = () => {
      openModal();
  };

    const confirmDelete = () => {
      handleRemoveObjectif(index);
      closeModal();
    }

    return(
        <View key={index} style={styles.objectifContainer}>
            <Text style={styles.textstyle}>{objectif}</Text>
            <Icon name='delete' onPress={handleDeletePress}  style={styles.deleteButton}/>
            <ConfirmModal visible={visible} confirmDelete={confirmDelete} cancelDelete={openModal} objectif={objectif}/>
        </View>
    )
};

const styles = StyleSheet.create({
      objectifContainer: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center'
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