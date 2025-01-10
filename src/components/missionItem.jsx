import { Text, View, StyleSheet, Pressable } from "react-native";


// Le composant MissionItem va recevoir des props
// text : le texte a afficher
// id : key de l'item
// handleLongPress : callback qui servira a supprimer l'item de la liste
const MissionItem = ({data, handleLongPress, handlePress}) => {
    return (
        <>
            <View style={data.completed ? styles.missionItemCompleted: styles.missionItem}>
                <Pressable
                    onPress={() => handlePress(data.key)}
                    onLongPress={() => handleLongPress(data.key)}
                    android_ripple={{color: '#bb1313'}}>
                    <Text style={styles.missionText}>{data.text}</Text>
                </Pressable>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    missionItem: {
        margin: 8,
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#783ece'
    },
    missionItemCompleted: {
        margin: 8,
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: 'rgba(78,173,39,0.98)'
    },
    missionText: {
        padding: 8,
        color: "#FFF"
    }
})

export default MissionItem;
