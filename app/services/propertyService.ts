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

interface PropertyResponse {
  data: Property[];
  error: string | null;
}

import localProperties from '../data/properties.json';

export async function fetchProperties(): Promise<PropertyResponse> {
    try {
        const response = await fetch('http://192.168.1.107:8080/location');
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
        const data = await response.json();
        console.log("Location Data", data);
        return { data: Array.isArray(data) ? data : [], error: null };   

    } catch (error) {
        console.log("Local P Error Net", localProperties);
        console.log("Error Net", error);
        return { 
            data: localProperties as Property[], 
            error: error instanceof Error ? error.message : 'Unknown error'
        };  
    }
}