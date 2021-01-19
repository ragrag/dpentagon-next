import axios from 'axios';
import Post from '../../interfaces/post';

const postByIdFetcher = async (postId: number): Promise<Post> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/posts/${postId}`, {});
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default postByIdFetcher;
