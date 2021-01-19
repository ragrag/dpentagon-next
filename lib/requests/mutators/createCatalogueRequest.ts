import axios from 'axios';
import Catalogue from '../../interfaces/catalogue';

const createCatalogueRequest = async (name: string): Promise<Catalogue> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/catalogues`,
      {
        name,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: localStorage.getItem('authToken'),
        },
      },
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default createCatalogueRequest;
