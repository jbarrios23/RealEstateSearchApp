import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import properties from './data/properties.json'; // Ensure the path is correct

export default function SearchScreen() {
  const [location, setLocation] = useState('San Francisco');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (location.length === 0) {
      setErrorMessage('Please enter a city or postal code.'); // Error message for empty input
      return;
    }

    // Check if there are matching properties
    const matchedProperties = properties.filter(property => 
      property.city.toLowerCase() === location.toLowerCase() ||
      property.city.toLowerCase() === location.trim() || 
      property.postalCode === location.trim()
    );

    if (matchedProperties.length > 0) {
      setErrorMessage(''); // Clear error message if there are matches
      router.push({
        pathname: 'screen/map',
        params: { location }
      });
    } else {
      setErrorMessage('No properties found in this location.'); // Error message for no properties found
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Properties</Text>
      <Text style={styles.instruction}>
        Enter the name of a city or a postal code in the search field below 
        and press the "Search Properties" button. This will show you a map 
        with the available properties in the specified location.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city or postal code"
        value={location}
        onChangeText={setLocation}
        autoCapitalize="words"
        autoCorrect={false}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search Properties</Text>
      </TouchableOpacity>
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
    color: '#555', // Color gris para el texto
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
    color: '#fff', // Color del texto
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red', // Color del texto de error
    textAlign: 'center',
    marginBottom: 10,
  },
});
