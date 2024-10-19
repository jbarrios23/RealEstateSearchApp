import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useLocalSearchParams, useRouter } from "expo-router"; // Cambiar a useLocalSearchParams
import properties from '../data/properties.json';

// Tipo para las propiedades
interface Property {
  id: string;        // Puede ser number si lo es en el JSON
  price: number;     // Agregamos el precio
  address: string;
  description: string; // Agregamos la descripción
  latitude: number;
  longitude: number;
  city: string;
  postalCode: string;
  image: string;
}


export default function MapScreen() {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const { location } = useLocalSearchParams(); 
  const router = useRouter();

  useEffect(() => {
    if (!location) return;

    const filtered = properties.filter(
      (property: Property) =>
        property.city.toLowerCase() === location.toLowerCase() ||
        property.postalCode === location
    );
    setFilteredProperties(filtered);

    if (filtered.length > 0) {
      const firstProperty = filtered[0];
      setRegion({
        latitude: firstProperty.latitude,
        longitude: firstProperty.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        {filteredProperties.map((property: Property) => (
          <Marker
            key={property.id}
            coordinate={{
              latitude: property.latitude,
              longitude: property.longitude,
            }}
            onPress={() => router.push({
              pathname: 'screen/property-details',
              params: { property: JSON.stringify(property) }
            })}
          >
            <View style={styles.marker}>
              <Image source={{ uri: property.image }} style={styles.markerImage} />
              <Text>{property.address}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  marker: {
    alignItems: 'center',
  },
  markerImage: {
    width: 50,
    height: 50,
  },
});
