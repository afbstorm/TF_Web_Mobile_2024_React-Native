import {StyleSheet, View, Text} from "react-native";

const MissionDetailsScreen = ({route}) => {
    const {mission} = route.params;
    // ⬇️ On peut également utiliser le hook useRoute() au lieu du prop
    // const route = useRoute();

    return (
       <View style={styles.screenContainer}>
           <View style={styles.detailsContainer}>
               <Text style={styles.title}>
                   {mission.text}
               </Text>
               <Text style={styles.location}>
                   {mission.location}
               </Text>
               <Text style={styles.desc}>
                   {mission.description}
               </Text>
           </View>
       </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex:1,
        paddingTop: 50,
        paddingHorizontal: 16,
        backgroundColor: "#1e085a"
    },
    detailsContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 16,
        textAlign: 'center'
    },
    desc: {
        fontSize: 24,
        color: '#FFF',
        marginBottom: 16,
        textAlign: 'center'
    },
    location: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center'
    }
})

export default MissionDetailsScreen;
