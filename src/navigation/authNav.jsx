import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/loginScreen";
import RegisterScreen from "../screens/auth/registerScreen";

const Stack = createNativeStackNavigator();

const AuthNav = () => {
    return (
        <Stack.Navigator id='authStack'>
            <Stack.Screen name='login' component={LoginScreen} options={{headerShown: false}} />
            <Stack.Screen name='register' component={RegisterScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    );
};

export default AuthNav;
