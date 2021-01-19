import axios from 'axios';
import Catalogue from '../../interfaces/catalogue';

const catalogueFetcherById = async (catalogueId: number): Promise<Catalogue> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/catalogues/${catalogueId}`, {});
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default catalogueFetcherById;
