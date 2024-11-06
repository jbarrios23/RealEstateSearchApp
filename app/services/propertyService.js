import localProperties from '../data/properties.json'

export async function fetchProperties() {
    try {
        const url='http://192.168.1.107:8080/location';
        const response = await fetch(url);
        console.log('URL',url)
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
        console.log("Location Data", data)
        return { data: Array.isArray(data) ? data : [], error: null };   

    } catch (error) {

        console.log("Local P Error Net", localProperties)
        console.log("Error Net", error)
        return { data: localProperties, error: error.message };  

    }
}