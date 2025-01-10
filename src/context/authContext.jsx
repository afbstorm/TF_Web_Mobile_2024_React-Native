import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Création du context qui va nous servir à gérer l'authentification
const AuthContext = createContext({});

// Création d'un hook custom pour utiliser plus facilement le context
export const useAuth = () => useContext(AuthContext);

// Création d'un provider qui va englober notre application pour lui fournir notre context
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Création d'un useEffect qui va servir à fournir au context un abonnement sur l'état de l'authentification
    useEffect(() => {
        // Création d'un " observable " qui va écouter les changements d'état de notre authentification
        // 1er paramètre de onAuthStateChanged est la variable d'authentification de firebase
        // 2ème paramètre de onAuthStateChanged est un callback qui contenir les informations du user
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        })

        // Cleanup pour désactiver l'abonnement
        return unsubscribe;
    }, [])

    const signup = (email, password) => {
        // 1er paramètre de createUserWithEmailAndPassword est la variable d'authentification de firebase
        // 2ème paramètre c'est l'email
        // 3ème paramètre c'est le password
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    // Création d'un objet qui va contenir les différents valeurs / méthodes à partager dans le context
    const value = {user, signup, login, logout};

    // Return (rendu) du provider
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
