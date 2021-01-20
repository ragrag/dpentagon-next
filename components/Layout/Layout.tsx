import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Container } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSWR from 'swr';
import User from '../../lib/interfaces/user';
import userFetcher from '../../lib/requests/fetchers/userFetcher';
import { userState, defaultUser, userLoggedInState } from '../../lib/store/user.store';
import Footer from '../Footer/Footer';
import TopBar from '../Header/TopBar/TopBar';
import React from 'react';
export default function Layout({ userInitialState, children }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [user, setUser] = useRecoilState(userState);
  const userLoggedIn = useRecoilValue(userLoggedInState);

  const logoutUser = () => {
    localStorage.removeItem('authToken');
    setUser(defaultUser);
  };
  const { data: userData, mutate, error } = useSWR('/api/user', userFetcher, {
    initialData: userInitialState,
    refreshInterval: 0,
    revalidateOnFocus: false,
    onError: err => {
      if (err?.response?.status === 401) {
        logoutUser();
      }
    },
  });

  // if (error?.response?.status === 401) {
  //   setUser(defaultUser);
  // }

  // React.useEffect(() => {
  //   if (error?.response?.status === 401) {
  //     logoutUser();
  //   }
  // }, [error]);

  React.useEffect(() => {
    if (userData) {
      setUser({
        loggedIn: true,
        ...userData,
      });
    }
  }, [userData]);

  return (
    <Container fluid style={{ minHeight: '100%', width: '100%', marginBottom: '100px' }}>
      <TopBar logoutUser={logoutUser} loggedIn={userLoggedIn}></TopBar>
      <br></br>
      {children}
      <Footer></Footer>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const user: User = await userFetcher();
    return { props: { userInitialState: user } };
  } catch (err) {
    return { props: { user: null } };
  }
};
