import axios from 'axios';

const requestEmailConfirmation = async (email): Promise<void> => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/email/confirmation/send`,
      {
        email,
      },
      {},
    );
  } catch (err) {
    throw err;
  }
};

export default requestEmailConfirmation;
