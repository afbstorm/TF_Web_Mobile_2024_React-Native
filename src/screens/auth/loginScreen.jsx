import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { useAuth } from "../../context/authContext";

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Récupération de la fonction de login depuis notre hook de context
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            await login(email, password);
            // Si login return thruthy -> firebase gère automatiquement la redirection
        } catch (err) {
            Alert.alert('Erreur de login : ', err.message);
        }
    };

    return (
        <View style={styles.loginContainer}>
            <TextInput
                style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none" />
            <TextInput
                style={styles.input}
                placeholder='Mot de passe'
                value={password}
                onChangeText={setPassword}
                secureTextEntry />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('register')}>
                <Text style={styles.link}>Pas encore de compte ? Inscrivez-vous ici !</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        marginBottom: 20,
        borderRadius: 5
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    },
    link: {
        color: '#007AFF',
        textAlign: 'center',
        marginTop: 15
    }
})

export default LoginScreen;
