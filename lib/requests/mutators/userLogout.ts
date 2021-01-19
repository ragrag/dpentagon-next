import axios from 'axios';

const userLogout = async (): Promise<void> => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: localStorage.getItem('authToken'),
        },
      },
    );
  } catch (err) {
    throw err;
  }
};

export default userLogout;
