import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StatsScreen from "../screens/stats/statsScreen";

const Stack = createNativeStackNavigator();

const StatsNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='stats' component={StatsScreen} options={{title: 'Vos statistiques'}} />
        </Stack.Navigator>
    );
};

export default StatsNav;
