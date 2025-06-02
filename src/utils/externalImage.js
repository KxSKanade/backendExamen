// src/utils/externalImage.js
const axios = require('axios');

/**
 * Obtiene una URL de imagen aleatoria desde la API definida en IMAGE_API_URL.
 * En este caso, Lorem Picsum devuelve una imagen en sí, pero podemos “interceptar”
 * la redirección para obtener la URL final.
 */
async function fetchRandomImageUrl() {
  try {
    // Lorem Picsum redirige a una imagen. Hacemos una petición HEAD para obtener la URL final
    const response = await axios.head(process.env.IMAGE_API_URL);
    // En response.headers.location estará la URL final de la imagen
    return response.headers.location;
  } catch (error) {
    console.error('Error al obtener imagen externa:', error.message);
    // En caso de falla, devolvemos una URL por defecto (puede ser un placeholder local o vacío)
    return null;
  }
}

module.exports = {
  fetchRandomImageUrl,
};
