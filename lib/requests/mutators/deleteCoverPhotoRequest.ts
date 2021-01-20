import axios from 'axios';

const deleteCoverPhotoRequest = async (): Promise<void> => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/coverphoto`, {
      withCredentials: true,
      headers: {
        Authorization: localStorage.getItem('authToken'),
      },
    });
  } catch (err) {
    throw err;
  }
};

export default deleteCoverPhotoRequest;
