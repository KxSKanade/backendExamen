import axios from 'axios'; 

async function fetchRandomImageUrl() {
  try {
    // HEAD sobre la URL externa para obtener el encabezado “location”
    const response = await axios.head(process.env.IMAGE_API_URL);
    return response.headers.location || 'https://picsum.photos/200';
  } catch (error) {
    console.error('Error al obtener imagen externa:', error.message);
    return 'https://picsum.photos/200'; // fallback en caso de error
  }
}

export { fetchRandomImageUrl };
