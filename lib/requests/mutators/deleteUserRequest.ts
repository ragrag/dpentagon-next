import axios from 'axios';

const deleteUserRequest = async (): Promise<void> => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user`, {
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem('authToken'),
      },
    });
  } catch (err) {
    throw err;
  }
};

export default deleteUserRequest;
