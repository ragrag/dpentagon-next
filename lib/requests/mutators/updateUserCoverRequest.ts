import axios from 'axios';

export interface UserCoverUpdateResponse {
  url: string;
}
const updateUserCoverRequest = async (photo: string): Promise<UserCoverUpdateResponse> => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/coverphoto`,
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

export default updateUserCoverRequest;
