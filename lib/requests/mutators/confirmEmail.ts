import axios from 'axios';

const confirmEmail = async (token): Promise<void> => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/email/confirm`,
      {
        token,
      },
      {},
    );
  } catch (err) {
    throw err;
  }
};

export default confirmEmail;
