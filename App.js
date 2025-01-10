import {NavigationContainer} from "@react-navigation/native";
import {AuthProvider} from "./src/context/authContext";
import Root from "./src/navigation/root";

const App = () => {
    return (
        <NavigationContainer>
            {/* AuthProvider va englober l'application pour fournir le/les context à toute l'app */}
            <AuthProvider>
                <Root/>
            </AuthProvider>
        </NavigationContainer>
    );
};

export default App;
