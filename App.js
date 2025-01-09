import {NavigationContainer} from "@react-navigation/native";
import AppNav from "./src/navigation/appNav";

const App = () => {
    return (
        <NavigationContainer>
                <AppNav />
        </NavigationContainer>
    );
};

export default App;
