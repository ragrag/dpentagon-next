import axios from 'axios';

const fetcher = async (url): Promise<any> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, { withCredentials: true });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default fetcher;
