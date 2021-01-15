import { atom, selector } from 'recoil';

type UserState = {
  loggedIn: boolean;
  id: number;
  email: string;
};

const defaultUser: UserState = {
  loggedIn: false,
  id: null,
  email: '',
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
export { userState, userLoggedInState };
