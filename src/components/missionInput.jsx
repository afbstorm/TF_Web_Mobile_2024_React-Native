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
    const [inputValue, setInputValue] = useState({
        text:'',
        description: '',
        location: ''
    });

    const handleInput = (name, value) => {
        setInputValue(currentMission => ({
            ...currentMission,
            [name]: value
        }));
    }

    const handleAddMission = () => {
        if (inputValue.text.trim() === '' || inputValue.description.trim() === '' || inputValue.location.trim() === '') {
            return;
        }

        setMissionList((currentMissions) => [...currentMissions, {
            key: nanoid(),
            text: inputValue.text,
            description: inputValue.description,
            location: inputValue.location,
            completed: false
        }])
        setInputValue({
            text:'',
            description: '',
            location: ''
        })
        // Fermeture de la modal à l'envoi de la valeur de l'input dans la liste
        handleClose()
    }

    return (
        // Modal vient avec ses props, un est obligatoire : visible ➡️ prend un booléen
        // animationType est un prop qui offre la possibilité d'avoir plusieurs types d'animations simples
        <Modal visible={isOpen} animationType='fade'>
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={require('../../assets/img/mission.png')}/>
                <TextInput
                    style={styles.textInput}
                    value={inputValue.text}
                    placeholderTextColor="#FFF"
                    placeholder='Inscrivez votre prochaine mission'
                    onChangeText={(value) => handleInput('text', value)} />
                <TextInput
                    style={styles.textInput}
                    value={inputValue.description}
                    multiline={true}
                    height={150}
                    textAlignVertical='top'
                    placeholderTextColor="#FFF"
                    placeholder='Décrivez votre prochaine mission'
                    onChangeText={(value) => handleInput('description', value)} />
                <TextInput
                    style={styles.textInput}
                    value={inputValue.location}
                    placeholderTextColor="#FFF"
                    placeholder='Où se passera votre prochaine mission'
                    onChangeText={(value) => handleInput('location', value)} />
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
    label: {
        width: '100%',
        textAlign: "left",
        fontSize: 18,
        fontWeight: 'bold',
        color: "white",
        marginBottom: 10,
        marginTop: 10
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
        paddingTop: 50,
        backgroundColor: "#452896"
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#ccc',
        marginRight: 8,
        marginBottom: 16,
        padding: 8,
        color: '#FFF',
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    button: {
        width: '48%',
        marginTop: 16,
        marginHorizontal: 8,
        backgroundColor: 'red',
        borderRadius: 8,
    },
    confirm: {
        width: '48%',
        marginTop: 16,
        marginHorizontal: 8,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        width: 80,
        height: 80,
        marginBottom: 16,
        tintColor: "white",
    }
})

export default MissionInput;
