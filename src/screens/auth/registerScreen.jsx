import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {useAuth} from "../../context/authContext";

const RegisterScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    // Récupération de la fonction de register (signup) depuis notre hook de context
    const { signup } = useAuth();

    const handleRegister = async () => {
        if (password !== confirmedPassword) {
            Alert.alert('Erreur, les mots de passe ne correspondent pas.')
            return;
        }
        try {
            await signup(email, password);
            // Si signup return thruthy -> firebase gère automatiquement la redirection
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
            <TextInput
                style={styles.input}
                placeholder='Confirmer mot de passe'
                value={confirmedPassword}
                onChangeText={setConfirmedPassword}
                secureTextEntry />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text style={styles.link}>Déjà un compte ? Connectez-vous ici !</Text>
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


export default RegisterScreen;
