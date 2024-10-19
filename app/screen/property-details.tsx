import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView,TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function PropertyDetails() {
  const { property } = useLocalSearchParams(); // Receives property from params
  const router = useRouter();

  const parsedProperty = property ? JSON.parse(property as string) : null;
  console.log("parsedProperty", parsedProperty);

  if (!parsedProperty) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No property details found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: parsedProperty.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{parsedProperty.address}</Text>
      <Text style={styles.price}>Price: ${parsedProperty.price}</Text>
      <Text style={styles.description}>{parsedProperty.description}</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Back to Map</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
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
});
