import {
    Button,
    StyleSheet,
    TextInput,
    View,
    Modal,
    Image
} from "react-native";
import { nanoid } from 'nanoid';
import { useState } from "react";


// setMissionList, isOpen, handleClose vont être les props reçus par le composant
const MissionInput = ({setMissionList, isOpen, handleClose}) => {
    const [inputValue, setInputValue] = useState('');

    const handleInput = (value) => {
        setInputValue(() => value);
    }

    const handleAddMission = () => {
        if (inputValue.trim() === '') {
            return;
        }

        setMissionList((currentMissions) => [...currentMissions, {
            key: nanoid(),
            text: inputValue
        }])
        setInputValue('')
        // Fermeture de la modal à l'envoi de la valeur de l'input dans la liste
        handleClose()
    }

    return (
        // Modal vient avec ses props, un est obligatoire : visible ➡️ prend un booléen
        // animationType est un prop qui offre la possibilité d'avoir plusieurs types d'animations simples
        <Modal visible={isOpen} animationType='fade'>
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={require('../../assets/img/mission.png')}/>
                <TextInput style={styles.textInput} value={inputValue} placeholderTextColor="#FFF" placeholder='Inscrivez votre prochaine mission' onChangeText={handleInput} />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title='Confirmer' onPress={handleAddMission} color='#5e0acc'/>
                    </View>
                    <View style={styles.button}>
                        <Button title='Annuler' onPress={handleClose} color='#f31282'/>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: "#452896"
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#ccc',
        marginRight: 8,
        padding: 8,
        color: '#FFF',
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    button: {
        width: '30%',
        marginTop: 16,
        marginHorizontal: 8
    },
    image: {
        width: 150,
        height: 150,
        margin: 25
    }
})

export default MissionInput;
