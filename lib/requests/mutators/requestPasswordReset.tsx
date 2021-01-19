import axios from 'axios';

const requestPasswordReset = async (email): Promise<void> => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/password/forget`,
      {
        email,
      },
      {},
    );
  } catch (err) {
    throw err;
  }
};

export default requestPasswordReset;
