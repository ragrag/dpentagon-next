import axios from 'axios';

export interface UpdateUserDTO {
  displayName: string;
  country: string;
  phoneNumber: string;
  address: string;
  profileInfo: string;
  professionId: number;
  email: string;
}

const updateUserRequest = async (updateUserDTO: UpdateUserDTO): Promise<void> => {
  try {
    await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users`,
      {
        ...updateUserDTO,
      },
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

export default updateUserRequest;
