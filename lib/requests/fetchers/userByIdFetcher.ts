import axios from 'axios';
import User from '../../interfaces/user';

const userByIdFetcher = async (userId): Promise<User> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${userId}`, {});
    return response.data;
  } catch (err) {
    throw err;
  }
};
export default userByIdFetcher;
