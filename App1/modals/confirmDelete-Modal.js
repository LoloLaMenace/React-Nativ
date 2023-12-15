import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

const ConfirmModal = ({ visible, confirmDelete, cancelDelete, objectif}) => {
    return(
        <Modal animationType="fade" transparent={true} visible = {visible} onRequestClose={cancelDelete}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                <View>
                    <Text style={styles.tittleText}>Etes-vous sûr de vouloir supprimer cet objectif ?:</Text>
                </View>
                <View style={styles.containerBtn}>
                    <Text>{objectif}</Text>
                </View>
                <View style={styles.containerBtn}>
                    <Pressable style={styles.modalButtonDelete} onPress={confirmDelete}><Text style={styles.textW}>SUPPRIMER</Text></Pressable>
                    <Pressable style={styles.modalButtonCancel} onPress={cancelDelete}><Text style={styles.textW}>ANNULER</Text></Pressable>
                </View>
                </View>
            </View>
        </Modal>
    )
};
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    tittleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },
    modalButtonDelete: {
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 5,
        padding: 10,
        margin: 5,
    },
    modalButtonCancel: {
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 5,
        padding: 10,
        margin: 5
    },
    containerBtn: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerObjectif:   {
        justifyContent: 'center'
    },
    textW:{
        color: 'white'
    }
});

export default ConfirmModal