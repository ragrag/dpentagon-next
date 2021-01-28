import Profession from './profession';

export default interface User {
  id: number;
  email: string;
  emailConfirmed: boolean;
  userType: string;
  profession: Profession;
  country: string;
  displayName: string;
  profileInfo: string;
  photo: string;
  coverPhoto: string;
  phoneNumber: string;
  address: string;
  website: string;
  private: boolean;
  createdAt: Date;
  updatedAt: Date;
}
