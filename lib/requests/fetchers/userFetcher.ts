import axios from 'axios';
import User from '../../interfaces/user';

const userFetcher = async (): Promise<User> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user`, {
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem('authToken'),
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
export default userFetcher;
