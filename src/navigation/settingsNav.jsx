import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/settings/settingsScreen";

const Stack = createNativeStackNavigator();

const SettingsNav = () => {
    return (
        <Stack.Navigator id='settingsStack'>
            <Stack.Screen name='settings' component={SettingsScreen} options={{title: 'Paramètres'}} />
        </Stack.Navigator>
    );
};

export default SettingsNav;
