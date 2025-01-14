// Pour react native, obligation d'installer react-native-get-random-values
// pour générer des valeurs aléatoires
// et l'importer tout en haut du composant
import 'react-native-get-random-values';
import {useNavigation} from "@react-navigation/native";
import {nanoid} from "nanoid";
// import { collection, query, onSnapshot, updateDoc, doc, serverTimestamp } from "firebase/firestore";
// import { auth, db } from '../../../firebaseConfig';
import {useEffect, useState} from 'react';
import {Alert, Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import { useAuth } from "../../context/authContext";
import useMissionsStore from "../../store/missionsStore";
import MissionInput from "../../components/missionInput";
import MissionItem from "../../components/missionItem";

// Récupération du prop de navigation pour pouvoir utiliser les méthodes liées à la navigation
const MissionsListScreen = ({navigation}) => {

    // const [inputValue, setInputValue] = useState('');
    // const [missionList, setMissionList] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    // ⭐💫⭐ AVEC ZUSTAND
    const { missions, isLoading, error, fetchMissions, completeMission } = useMissionsStore();

    // ⬇️ On peut ne pas utiliser le prop navigation en passant par le hook useNavigation()
    // const navigation = useNavigation()


    const handleMissionPress = (id) => {
        // const mission = missionList.find(mission => mission.id === id);
        // ⭐💫⭐ AVEC ZUSTAND
        const mission = missions.find(mission => mission.id === id);
        navigation.navigate('MissionDetails', {mission});
    }

    const handleModal = () => {
        setIsOpen(!isOpen)
    }

    // ⭐💫⭐ AVEC ZUSTAND
    useEffect(() => {

        // fetchMissions return la fonction unsubscribe qui va nous permettre de se désabonner du onSnapshot (observable)
        const unsubscribe = fetchMissions();

        // Le return fait office de cleanup qui sera appelée quand le composant sera " unmount " (désactivé, supprimé, retiré des vues)
        // ou quand s'il y en a, les dépendances du useEffect changent de valeurs
        // Le && vérifie que unsubscribe existe (thruthy) avant de l'appeler
        // parce que fetchMissions ne return pas la fonction s'il y a erreur lors de la requête
        return () => unsubscribe && unsubscribe();

    }, []);

    if (!isLoading && missions.length === 0) {
        return (
            <View style={styles.appContainer}>
                <Button title='Nouvelle mission' color='#c72f2f' onPress={handleModal}/>
                {isOpen && (
                    <MissionInput isOpen={isOpen} handleClose={handleModal}/>
                )}
                <View style={styles.missionsContainer}>
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>Pas de mission en cours !</Text>
                    </View>
                </View>
            </View>
        )
    }
    if (isLoading) {
        return (
            <View style={styles.appContainer}>
                <Button title='Nouvelle mission' color='#c72f2f' onPress={handleModal}/>
                {isOpen && (
                    <MissionInput isOpen={isOpen} handleClose={handleModal}/>
                )}
                <View style={styles.missionsContainer}>
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>Récupération de vos missions...</Text>
                    </View>
                </View>
            </View>
        )
    }
    if (error) {
        return (
            <View style={styles.appContainer}>
                <Button title='Nouvelle mission' color='#c72f2f' onPress={handleModal}/>
                {isOpen && (
                    <MissionInput isOpen={isOpen} handleClose={handleModal}/>
                )}
                <View style={styles.missionsContainer}>
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageError}>{error}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <>
            {/* Conteneur principal de l'application */}
            <View style={styles.appContainer}>

                <Button title='Nouvelle mission' color='#c72f2f' onPress={handleModal}/>
                {isOpen && (
                    <MissionInput isOpen={isOpen} handleClose={handleModal}/>
                )}

                {/*⬇️ AVANT séparation des composants et création de la modal ⬇️*/}
                {/* Conteneur de l'input */}
                {/*<View style={styles.inputContainer}>*/}
                {/*    <TextInput style={styles.textInput} value={inputValue} placeholderTextColor="#FFF" placeholder='Inscrivez votre prochaine mission' onChangeText={handleInput} />*/}
                {/*    <Button title='Confirmer' onPress={handleAddMission} />*/}
                {/*</View>*/}
                {/*⬆️ AVANT séparation des composants et création de la modal ⬆️*/}

                {/* Conteneur de la liste des missions ⚠️ la liste ne sera pas scrollable */}
                {/*<View style={styles.missionsContainer}>*/}
                {/*    {missionList.map((mission, index) => (*/}
                {/*        <View key={index} style={styles.missionItem}>*/}
                {/*            <Text style={styles.missionText}>{mission}</Text>*/}
                {/*        </View>*/}
                {/*    ))}*/}
                {/*</View>*/}

                {/* Conteneur de la liste des missions ✅ la liste est scrollable gràce a ScrollView mais ⚠️ aux performances ! */}
                {/*<View style={styles.missionsContainer}>*/}
                {/*    <ScrollView>*/}
                {/*        {missionList.map((mission, index) => (*/}
                {/*            <View key={index} style={styles.missionItem}>*/}
                {/*                <Text style={styles.missionText}>{mission}</Text>*/}
                {/*            </View>*/}
                {/*        ))}*/}
                {/*    </ScrollView>*/}
                {/*</View>*/}

                <View style={styles.missionsContainer}>
                        <FlatList
                            data={missions}
                            renderItem={(itemData) => {
                                return (
                                    <MissionItem
                                        data={itemData.item}
                                        handlePress={handleMissionPress}
                                        handleLongPress={completeMission}/>
                                )
                            }}
                        />
                </View>
            </View>
        </>
    );
};


    const styles = StyleSheet.create({
        appContainer: {
            flex: 1,
            paddingTop: 50,
            paddingHorizontal: 16,
            backgroundColor: '#452896'
        },
        // inputContainer: {
        //     flex: 1,
        //     flexDirection: 'row',
        //     justifyContent: 'space-between',
        //     alignItems: 'center',
        //     marginBottom: 24,
        // },
        // textInput: {
        //     borderWidth: 1,
        //     borderColor: '#ccc',
        //     marginRight: 8,
        //     padding: 8,
        //     color: '#FFF',
        //     width: '70%',
        // },
        missionsContainer: {
            flex: 5
        },
        // missionItem: {
        //     margin: 8,
        //     padding: 8,
        //     borderRadius: 4,
        //     borderColor: '#ccc',
        //     borderWidth: 1,
        //     backgroundColor: '#783ece'
        // },
        // missionText: {
        //     color: "#FFF"
        // },
        messageContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        messageText: {
            color: "#FFF",
            fontSize: 16
        },
        messageError: {
            color: "#ab0000",
            fontSize: 16
        }

    });

export default MissionsListScreen;


