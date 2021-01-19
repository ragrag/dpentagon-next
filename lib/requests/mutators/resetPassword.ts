import axios from 'axios';

const resetPassword = async (token: string, password: string): Promise<void> => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/password/reset`,
      {
        token,
        password,
      },
      {},
    );
  } catch (err) {
    throw err;
  }
};

export default resetPassword;
