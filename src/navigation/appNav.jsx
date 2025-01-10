import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MissionNav from "./missionNav";
import SettingsNav from "./settingsNav";
import StatsNav from "./statsNav";

// La fonction createBottomTabNavigator permet de créer une barre
// de navigation en bas de page de l'application, depuis cette
// fonction nous avons accès à plusieurs autres méthodes
const Tab = createBottomTabNavigator();

const AppNav = () => {
    return (
        <Tab.Navigator id='mainNav'>
            {/*
                Screen permet de définir un écran qui sera afficher lors de la
                press  du bouton de navigation en bas de l'écran.
                Il y a 3 props principaux :
                    - name : le nom utilisé pour faire la liaison dans un composant tiers
                    - component : le nom d'import du composant ciblé
                    - options : les options possibles sur la route (ou sur le tab)
                    Référez-vous à la doc : https://reactnavigation.org/docs/bottom-tab-navigator
            */}
            <Tab.Screen
                name='MissionTab'
                component={MissionNav}
                options={{
                    headerShown: false,
                    title: 'Missions',
                    tabBarIcon: () => (
                        <FontAwesome5
                            name='tasks'
                            size={24}
                            color='black' />)}} />
            <Tab.Screen
                name='StatsTab'
                component={StatsNav}
                options={{
                    headerShown: false,
                    title: 'Stats',
                    tabBarIcon: () => (
                        <FontAwesome5
                            name='chart-pie'
                            size={24}
                            color='black' />
                    )}} />
            <Tab.Screen
                name='SettingsTab'
                component={SettingsNav}
                options={{
                    headerShown: false,
                    title: 'Settings',
                    tabBarIcon: () => (
                        <Ionicons
                            name='settings-sharp'
                            size={24}
                            color='black' />
                    )}} />
            <Tab.Screen
                name='AuthenticationTab'
                component={SettingsNav}
                options={{
                    headerShown: false,
                    title: 'Login',
                    tabBarIcon: () => (
                        <FontAwesome5
                            name='user-alt'
                            size={24}
                            color='black'
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default AppNav;
