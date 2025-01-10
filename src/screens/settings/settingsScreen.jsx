import {Text, View, TouchableOpacity, StyleSheet} from "react-native";
import { useAuth } from "../../context/authContext";

const SettingsScreen = () => {
    // On extrait uniquement la fonction de logout pour que l'utilisateur puisse se
    // déconnecter depuis les settings
    const { logout } = useAuth();

    return (
        <View style={styles.settingsContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutText}>Se déconnecter</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    settingsContainer: {
        flex: 1,
        padding: 20
    },
    logoutButton: {
        backgroundColor: '#ff3b30',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20
    },
    logoutText: {
        color: '#fff',
        fontSize: 16
    }
})

export default SettingsScreen;
