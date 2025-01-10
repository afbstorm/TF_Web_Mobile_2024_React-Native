import { useAuth } from "../context/authContext";
import AppNav from "./appNav";
import AuthNav from "./authNav";

const Root = () => {
    // Récupération du context contenant l'utilisateur
    const { user } = useAuth();

    return user ? <AppNav/> : <AuthNav/>

    // return (
    //     <>
    //         {user ? <AppNav/> : <AuthNav/>}
    //     </>
    // );
};

export default Root;
