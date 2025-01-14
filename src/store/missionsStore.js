import { create } from 'zustand';
import { collection, query, doc, updateDoc, deleteDoc, setDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { auth, db } from '../../firebaseConfig';

// Création du store zustand
const useMissionsStore = create((set, get) => ({
    // Déclaration de l'initialState
    missions: [],
    isLoading: false,
    error: null,

    fetchMissions: () => {
        set({isLoading: true});
        try {
            const missionsQuery = query(collection(db, 'users', auth.currentUser.uid, 'missions'));

            // Création de " l'observable " pour écouter en direct notre collection de missions appartenant a l'utilisateur ciblé
            const unsubscribe = onSnapshot(missionsQuery,
                // Callback en cas de succès de la requête missionsQuery
                (querySnapshot) => {
                const missionsList = [];
                querySnapshot.forEach(document => {
                    missionsList.push({id: document.id, ...document.data()});
                });

                set({missions: missionsList, isLoading: false});
            },
                // Callback en cas d'erreur lors de la requête missionsQuery
                (error) => {
                    set({error: error.message, isLoading: false});
                    throw error;
                });

            return unsubscribe;

        } catch (err) {
            set({error: err.message, isLoading: false});
            throw err;
        }
    },
    addMission: async (data) => {
        set({isLoading: true});
        try {
            // Crée la référence d'un nouveau document dans la collection missions du user actuellement connecté
            const newDoc = doc(collection(db, 'users', auth.currentUser.uid, 'missions'));

            // Préparer / créer l'objet à insérer dans le document
            const mission = {
                id: newDoc.id,
                ...data,
                completed: false,
                createdAt: serverTimestamp()
            };

            // Envoi des informations via la référence nouvellement crée dans firestore
            await setDoc(newDoc, mission);
            set({isLoading: false});
        } catch (err) {
            set({error: err.message, isLoading: false});
            throw err;
        }
    },
    completeMission: async (id) => {
        set({isLoading: true});
        try {
            const docRef = doc(db, 'users', auth.currentUser.uid, 'missions', id);

            await updateDoc(docRef, {
                completed: true,
                updatedAt: serverTimestamp()
            });

            set({isLoading: false});
        } catch (err) {
            set({error: err.message, isLoading: false});
            throw err;
        }
    },
    deleteMission: async (id) => {
        set({isLoading: true});
        try {
            const docRef = doc(db, 'users', auth.currentUser.uid, 'missions', id);

            await deleteDoc(docRef);

            set({isLoading: false});
        } catch (err) {
            set({error: err.message, isLoading: false});
            throw err;
        }
    }
}));

export default useMissionsStore;
