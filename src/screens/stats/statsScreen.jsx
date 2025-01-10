import { PieChart } from "react-native-gifted-charts";
import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

const StatsScreen = () => {

    const missions = [
        {
            key: "Yk7lM9nX2pQ",
            text: "Révision du rapport trimestriel",
            description: "Analyser les données financières et préparer la présentation pour le conseil d'administration",
            location: "Bureau principal",
            completed: true
        },
        {
            key: "Hj4kR8vW5mN",
            text: "Maintenance des serveurs",
            description: "Effectuer la mise à jour mensuelle des serveurs et vérifier les sauvegardes",
            location: "Salle serveur",
            completed: false
        },
        {
            key: "Zw9sP3bC6tD",
            text: "Formation des nouveaux employés",
            description: "Session d'orientation pour les recrues du département marketing",
            location: "Salle de conférence A",
            completed: true
        },
        {
            key: "Qx2gL5fT8hB",
            text: "Réunion client ProjectX",
            description: "Présentation des avancées du projet et discussion des prochaines étapes",
            location: "Salle de réunion virtuelle",
            completed: false
        },
        {
            key: "Vm6jN9cY4wS",
            text: "Audit de sécurité",
            description: "Vérification trimestrielle des protocoles de sécurité informatique",
            location: "Département IT",
            completed: true
        },
        {
            key: "Ue3dK7pH1aF",
            text: "Planification budget 2025",
            description: "Préparation des prévisions budgétaires pour l'année prochaine",
            location: "Bureau CFO",
            completed: false
        },
        {
            key: "Is8mB4rE9oG",
            text: "Mise à jour site web",
            description: "Intégration des nouvelles fonctionnalités et correction des bugs",
            location: "Remote",
            completed: false
        },
        {
            key: "Nt5qW2xA7yJ",
            text: "Inventaire matériel",
            description: "Recensement annuel des équipements informatiques",
            location: "Entrepôt",
            completed: false
        },
        {
            key: "Bp1zD6uM3iK",
            text: "Recrutement développeur",
            description: "Entretiens pour le poste de développeur full-stack senior",
            location: "RH - Bureau 302",
            completed: false
        },
        {
            key: "Cl4gH8sV0nR",
            text: "Revue de code sprint 24",
            description: "Analyse et validation du code produit pendant le dernier sprint",
            location: "Espace développeurs",
            completed: false
        }
    ];

    const [datas, setDatas] = useState([
        {value: 0, color: '#fbe987', text: null},
        {value: 0, color: '#b98d63', text: null}
    ]);

    useEffect(() => {
        let completedCount = 0;
        let onGoingCount = 0;
        for (let i = 0; i < missions.length; i++) {
            if (missions[i].completed) {
                completedCount++
            } else {
                onGoingCount++
            }
        }

        setDatas([
            {value: completedCount, color: '#fbe987', text: 'Terminées ' + (datas[0].value / missions.length) * 100 + '%'},
            {value: onGoingCount, color: '#b98d63', text: 'En cours ' + (datas[1].value / missions.length) * 100 + '%'}
        ])
    }, []);

    return (
        <View style={styles.statsContainer}>
            <PieChart data={datas} radius={190} showTooltip/>
        </View>
    );
};

const styles = StyleSheet.create({
    statsContainer: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
        backgroundColor: '#452896'
    }
})

export default StatsScreen;
