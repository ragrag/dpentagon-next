import Profession from './profession';

export default interface User {
  id: number;
  email: string;
  emailConfirmed: boolean;
  password: string;
  userType: string;
  profession: Profession;
  country: string;
  displayName: string;
  profileInfo: string;
  photo: string;
  coverPhoto: string;
  phoneNumber: string;
  address: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
