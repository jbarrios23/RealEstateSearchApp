import { useState, useEffect } from "react";
import { fetchProperties } from "../services/propertyService";
import backupProperties from "../data/properties.json";

interface Property {
  id: string;
  price: number;
  address: string;
  description: string;
  latitude: number;
  longitude: number;
  city: string;
  postalCode: string;
  image: string;
}

interface UsePropertiesReturn {
  properties: Property[];
  loading: boolean;
  errorMessage: string;
  searchProperties: (location: string) => Property[];
}

export default function useProperties(): UsePropertiesReturn {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      const { data, error } = await fetchProperties();
      console.log("Datos ", data);
      
      if (error) {
        setErrorMessage("No se pudieron cargar los datos en línea. Usando datos locales.");
        setProperties(backupProperties as Property[]); 
      } else {
        setErrorMessage('');
        setProperties(data);
      }

      setLoading(false);
    };
    
    loadProperties();
  }, []);

  const searchProperties = (location: string): Property[] => {
    const normalizedLocation = location.trim().toLowerCase();
    console.log("searchProperties ", properties);
    
    if (!properties || properties.length === 0) return []; 
    
    return properties.filter((property: Property) =>
      property.city.toLowerCase() === normalizedLocation ||
      property.postalCode === normalizedLocation
    );
  };

  return { properties, loading, errorMessage, searchProperties };
}