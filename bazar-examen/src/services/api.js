const BASE_URL = 'https://www.bazarexamen.somee.com';

const searchProducts = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/api/items?name=${query}`);

    if (!response.ok) {
      console.error('Error en la respuesta de la solicitud:', response.status);
      throw new Error('Error en la respuesta de la solicitud');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al realizar la solicitud:', error.message);
    throw error;
  }
};

const getProductById = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/items/${productId}`);

    if (!response.ok) {
      console.error('Error en la respuesta de la solicitud:', response.status);
      throw new Error('Error en la respuesta de la solicitud');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al realizar la solicitud:', error.message);
    throw error;
  }
};

export default {
  searchProducts,
  getProductById,
};
