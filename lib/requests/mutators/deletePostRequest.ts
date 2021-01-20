import axios from 'axios';

const deletePostRequest = async (postId: number): Promise<void> => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/posts/${postId}`, {
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem('authToken'),
      },
    });
  } catch (err) {
    throw err;
  }
};

export default deletePostRequest;
