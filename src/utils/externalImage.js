async function fetchRandomImageUrl() {
  try {
    const response = await axios.head(process.env.IMAGE_API_URL);
    return response.headers.location || 'https://via.placeholder.com/200';
  } catch (error) {
    console.error('Error al obtener imagen externa:', error.message);
    return 'https://via.placeholder.com/200'; // fallback
  }
}
