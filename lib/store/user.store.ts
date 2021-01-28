import { atom, selector } from 'recoil';
import User from '../interfaces/user';

type UserState = {
  loggedIn: boolean;
} & User;

const defaultUser: UserState = {
  loggedIn: false,
  id: null,
  email: null,
  address: null,
  country: null,
  coverPhoto: null,
  createdAt: null,
  displayName: null,
  emailConfirmed: false,
  phoneNumber: null,
  photo: null,
  profession: null,
  profileInfo: null,
  updatedAt: null,
  userType: null,
  website: null,
  private: null,
};

const userState = atom({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: defaultUser, // default value (aka initial value)
});

const userLoggedInState = selector({
  key: 'userLoggedInState',
  get: ({ get }) => {
    return get(userState).loggedIn;
  },
});
export { userState, userLoggedInState, defaultUser };
