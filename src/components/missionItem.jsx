import { Text, View, StyleSheet, Pressable } from "react-native";


// Le composant MissionItem va recevoir des props
// text : le texte a afficher
// id : key de l'item
// handleLongPress : callback qui servira a supprimer l'item de la liste
const MissionItem = ({text, id, handleLongPress, handlePress}) => {
    return (
        <>
            <View style={styles.missionItem}>
                <Pressable
                    onPress={() => handlePress(id)}
                    onLongPress={() => handleLongPress(id)}
                    android_ripple={{color: '#bb1313'}}>
                    <Text style={styles.missionText}>{text}</Text>
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
    missionText: {
        padding: 8,
        color: "#FFF"
    }
})

export default MissionItem;
