import axios from 'axios';

export interface UserPhotoUpdateResponse {
  url: string;
}
const updateUserPhotoRequest = async (photo: string): Promise<UserPhotoUpdateResponse> => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/photo`,
      {
        photo,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: localStorage.getItem('authToken'),
        },
      },
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default updateUserPhotoRequest;
