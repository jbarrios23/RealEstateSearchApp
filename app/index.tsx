import { Text, View, StyleSheet, TextInput, TouchableOpacity,ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import useProperties from './hook/useProperties';

export default function SearchScreen() {
  const [location, setLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { properties, loading, errorMessage: fetchError, searchProperties } = useProperties();

  const handleSearch = () => {
    console.log("Location", location)
    const locationTrimed=location.trim();
    
    if (location.length === 0) {
      setErrorMessage('Please enter a city or postal code.'); // Error message for empty input
      return;
    }

    const matchedProperties = searchProperties(locationTrimed);
    console.log("P", matchedProperties)

    if (matchedProperties.length > 0) {
      setErrorMessage('');
      router.push({
        pathname: 'screen/map',
        params: { location }
      });
    } else {
      setErrorMessage('No properties found in this location.');
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Search Properties</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter city or zip code"
      value={location}
      onChangeText={setLocation}
    />
    {fetchError ? <Text style={styles.error}>{fetchError}</Text> : null}
    {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    {loading ? (
      <ActivityIndicator size="large" color="#007BFF" />
    ) : (
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar Propiedades</Text>
      </TouchableOpacity>
    )}
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
