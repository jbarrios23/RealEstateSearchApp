import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import localProperties from './data/properties.json';  

// Definición del tipo de cada propiedad
type Property = {
  city: string;
  postalCode: string;
  // otros campos si los tienes
};

export default function SearchScreen() {
  const [location, setLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const [loading,setLoading]=useState(false);
  const [properties, setProperties] = useState<Property[]>([]);

  
  const fecthProperties= async ()=>{
    try{

      setLoading(true)
      const response=await fetch('http://192.168.1.107:8080/location');
      if (!response.ok) {
        let errorMessage = 'Error fetching properties';
        
        switch (response.status) {
          case 404:
            errorMessage = 'Properties not found';
            break;
          case 500:
            errorMessage = 'Server error, please try again later';
            break;
          default:
            errorMessage = `Unexpected error: ${response.status}`;
        }
      
        throw new Error(errorMessage);
      }
      const data =await response.json();
      console.log("Location Data",data)
      setProperties(data);

    }catch (error) {
      setErrorMessage('Could not fetch properties. Please try again later.');
      console.log("Local P Error Net",localProperties)
      setProperties(localProperties)
      //console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    console.log("start","")
    fecthProperties();
  },[])
  
  
  const handleSearch = () => {
    console.log("P",properties)
    if (location.length === 0) {
      setErrorMessage('Please enter a city or postal code.'); // Error message for empty input
      return;
    }

    
    // const matchedProperties = properties.filter(property => 
    //   property.city.toLowerCase() === location.toLowerCase() ||
    //   property.city.toLowerCase() === location.trim() || 
    //   property.postalCode === location.trim()
    // );

    const normalizedLocation = location.trim().toLowerCase();

    const matchedProperties = properties.filter(property => 
      property.city.toLowerCase() === location.toLowerCase() ||
      property.city.toLowerCase() === normalizedLocation || 
      property.postalCode === location.trim()
    );

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
