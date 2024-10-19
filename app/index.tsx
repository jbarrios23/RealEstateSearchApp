import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { Link } from 'expo-router';
import { useState } from "react";
import { useRouter } from "expo-router";

export default function SearchScreen() {

  const [location, setLocation] = useState('')
  const route = useRouter();

  //voy a la pantall del mapa pasando la ubicacion por parametro


  const handlerSearch = () => {
    console.log("Location", location)
    route.push({
      pathname: 'screen/map',
      params: { location }
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingrese ciudad o código postal"
        value={location}
        onChangeText={setLocation}

      />
      <Button title="Buscar Propiedades" onPress={handlerSearch} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
