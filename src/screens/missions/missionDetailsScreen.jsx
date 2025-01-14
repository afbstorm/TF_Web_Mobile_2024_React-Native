// import {auth, db} from "../../../firebaseConfig";
// import {doc, deleteDoc} from "firebase/firestore";
import {StyleSheet, View, Text, TouchableOpacity, Alert} from "react-native";
import useMissionsStore from "../../store/missionsStore";

const MissionDetailsScreen = ({route, navigation}) => {
    const {mission} = route.params;
    // ⬇️ On peut également utiliser le hook useRoute() au lieu du prop
    // const route = useRoute();

    // ⭐💫⭐ AVEC ZUSTAND
    const deleteMission = useMissionsStore(state => state.deleteMission);
    const handleDelete = async () => {
        try {
            await deleteMission(mission.id);

            navigation.navigate('MissionsList');
        } catch (err) {
            Alert.alert('Erreur :', err.message)
        }
    }

    // ⬇️⬇️⬇️ Pré-Zustand
    // const handleDelete = async () => {
    //     try {
    //         // 🟢 UN SEUL USER EN DB (application privée)
    //         // const docRef = doc(db, 'missions', mission.id));
    //
    //         // 🟢🟢🟢 MULTIPLES USERS EN DB
    //         const docRef = doc(db, 'users', auth.currentUser.uid, 'missions', mission.id);
    //
    //         await deleteDoc(docRef);
    //         navigation.navigate('MissionsList')
    //     } catch (err) {
    //         Alert.alert('Erreur :', err.message);
    //     }
    // }

    return (
       <View style={styles.screenContainer}>
           <View style={styles.detailsContainer}>
               <Text style={styles.title}>
                   {mission.text}
               </Text>
               <Text style={styles.location}>
                   {mission.location}
               </Text>
               <Text style={styles.desc}>
                   {mission.description}
               </Text>
           </View>
           <View style={styles.buttonContainer}>
               <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                   <Text style={styles.deleteText}>Supprimer la mission</Text>
               </TouchableOpacity>
           </View>
       </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex:1,
        paddingTop: 50,
        paddingHorizontal: 16,
        backgroundColor: "#1e085a"
    },
    detailsContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 16,
        textAlign: 'center'
    },
    desc: {
        fontSize: 24,
        color: '#FFF',
        marginBottom: 16,
        textAlign: 'center'
    },
    location: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center'
    },
    buttonContainer: {
        flex: 1,
        padding: 20
    },
    deleteButton: {
        backgroundColor: '#ff3b30',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20
    },
    deleteText: {
        color: '#fff',
        fontSize: 16
    }
})

export default MissionDetailsScreen;
