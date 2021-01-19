import axios from 'axios';
import Profession from '../../interfaces/profession';

const professionsFetcher = async (): Promise<Profession[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/professions`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default professionsFetcher;
