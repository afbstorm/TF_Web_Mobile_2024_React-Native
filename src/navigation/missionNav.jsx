import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MissionsListScreen from "../screens/missions/missionsListScreen";
import MissionDetailsScreen from "../screens/missions/missionDetailsScreen";

const Stack = createNativeStackNavigator();

const MissionNav = () => {
    return (
        <Stack.Navigator id='missionsStack'>
            {/* Référez-vous à la doc : https://reactnavigation.org/docs/native-stack-navigator */}
            <Stack.Screen
                name='MissionsList'
                component={MissionsListScreen}
                options={{title: 'Mes missions'}}/>
            <Stack.Screen
                name='MissionDetails'
                component={MissionDetailsScreen}
                options={{title: 'Détails de la mission'}} />
        </Stack.Navigator>
    );
};

export default MissionNav;
