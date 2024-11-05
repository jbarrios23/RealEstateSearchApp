import { useState, useEffect } from "react";
import { fetchProperties } from "../services/propertyService";
import backupProperties from "../data/properties.json"; // Datos locales de respaldo

export default function useProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      const { data, error } = await fetchProperties();

      if (error) {
        setErrorMessage("No se pudieron cargar los datos en línea. Usando datos locales.");
        setProperties(backupProperties); // Usar datos locales como respaldo
      } else {
        setErrorMessage('');
        setProperties(data);
      }

      setLoading(false);
    };
    
    loadProperties();
  }, []);

  const searchProperties = (location) => {
    const normalizedLocation = location.trim().toLowerCase();
    if (!properties || properties.length === 0) return []; 
    return properties.filter(property =>
      property.city.toLowerCase() === normalizedLocation ||
      property.postalCode === normalizedLocation
    );
  };

  return { properties, loading, errorMessage, searchProperties };
}
