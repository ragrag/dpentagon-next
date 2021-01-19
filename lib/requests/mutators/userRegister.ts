import axios from 'axios';

export interface RegisterUserDTO {
  email: string;
  password: string;
  userType: string;
  professionId: number;
  displayName: string;
  country: string;
  address: string;
  phoneNumber: string;
}

const userRegister = async (registerUserDTO: RegisterUserDTO): Promise<void> => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/register`,
      {
        ...registerUserDTO,
      },
      { withCredentials: true },
    );
  } catch (err) {
    throw err;
  }
};

export default userRegister;
