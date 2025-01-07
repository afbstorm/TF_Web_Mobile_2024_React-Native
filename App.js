// Pour react native, obligation d'installer react-native-get-random-values
// pour générer des valeurs aléatoires
// et l'importer tout en haut du composant
import 'react-native-get-random-values';
import {useState} from 'react';
import {Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {nanoid} from "nanoid";

export default function App() {

  const [inputValue, setInputValue] = useState('');
  const [missionList, setMissionList] = useState([]);

  const handleInput = (value) => {
      setInputValue(() => value);
  }

  const handleAddMission = () => {
      // ⬇️ en utilisant un tableau simple, index étant la key
      // setMissionList((currentMissions) => [...missionList, inputValue])

      // ⬇️ en utilisant un objet avec un id unique par élément
      setMissionList((currentMissions) => [...currentMissions, {
          key: nanoid(),
          text: inputValue
      }])
      setInputValue('')
  }

  // View :
  // Va être le conteneur principal de vos éléments native.
  // Il n'accepte pas de texte directement, il faut utiliser des composants tiers.
  // Pas de CSS, on injecte le style depuis un objet javascript qu'on va créer avec le composant StyleSheet.
  // Utilise uniquement du flexbox.
  // N'est pas scrollable.

  // ScrollView :
  // Va utiliser directement un simili de règle de scroll CSS
  // Props pour gèrer le comportement du scroll
  // Diminue les performances car charge la liste entière directement

  // Text :
  // Tout texte devra TOUJOURS être un child d'un composant Text
  // Il n'y a que le Text, pas de sémantique particulière : pas de h1,h2,p,span,...

  // StyleSheet :
  // Par défaut, le layout est en flex
  // La flex par défaut, contrairement au CSS (web ou c'est en row), la direction est column
  // La taille du flex n'est pas gérée par des %, rem, em, ... mais par des nombres
  // Ces nombres (valeurs) sont relatifs entre eux, c'est-à-dire que flex: 2 sera 2x plus grand que flex: 1
  // Les width et height sont prioritaires par rapport au flex

  // TextInput :
  // Est utilisé pour TOUT type d'input, nous n'aurons pas de type='text', type='number', ...
  // onChangeText au lieu de onChange (même comportement)

  // Button :
  // Est une version cheap du bouton HTML
  // title et onPress sont les props obligatoires du composant
  // Impossible a styliser. Si on veut un bouton personnaliser, on utilisera soit Pressable soit TouchableOpacity
  // Style par defaut du bouton différent selon l'OS

  // FlatList :
  // " Alternative " officielle au mapping dans le composant
  // N'affiche que les éléments rentrant dans l'espace alloué à la FlatList
  // Ceux qui ne sont plus visible (en haut ou en bas dépendant du sens du scroll, sont purement et simplement retirés de l'affichage)
  // Les éléments vont être render comme une vue d'un composant React via un renderItem
  // Le scroll est géré nativement
  // La key est gérée automatiquement. Mais, on peut également la gérée manuellement avec le prop keyExtractor

  return (
      <>
        {/* Conteneur principal de l'application */}
        <View style={styles.appContainer}>
            {/* Conteneur de l'input */}
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} value={inputValue} placeholderTextColor="#FFF" placeholder='Inscrivez votre prochaine mission' onChangeText={handleInput} />
                <Button title='Confirmer' onPress={handleAddMission} />
            </View>

            {/* Conteneur de la liste des missions ⚠️ la liste ne sera pas scrollable */}
            {/*<View style={styles.missionsContainer}>*/}
            {/*    {missionList.map((mission, index) => (*/}
            {/*        <View key={index} style={styles.missionItem}>*/}
            {/*            <Text style={styles.missionText}>{mission}</Text>*/}
            {/*        </View>*/}
            {/*    ))}*/}
            {/*</View>*/}

            {/* Conteneur de la liste des missions ✅ la liste est scrollable gràce a ScrollView mais ⚠️ aux performances ! */}
            {/*<View style={styles.missionsContainer}>*/}
            {/*    <ScrollView>*/}
            {/*        {missionList.map((mission, index) => (*/}
            {/*            <View key={index} style={styles.missionItem}>*/}
            {/*                <Text style={styles.missionText}>{mission}</Text>*/}
            {/*            </View>*/}
            {/*        ))}*/}
            {/*    </ScrollView>*/}
            {/*</View>*/}

            <View style={styles.missionsContainer}>
                <FlatList
                    data={missionList}
                    renderItem={(itemData) => {
                        return (
                            <View style={styles.missionItem}>
                                <Text style={styles.missionText}>{itemData.item.text}</Text>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
      </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#452896'
  },
  inputContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
  },
  textInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      marginRight: 8,
      padding: 8,
      color: '#FFF',
      width: '70%',
  },
  missionsContainer: {
      flex: 5
  },
  missionItem: {
      margin: 8,
      padding: 8,
      borderRadius: 4,
      backgroundColor: '#b70808'
  },
  missionText: {
      color: "#FFF"
  }

});
