import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Col, Row, Image, Card } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSWR from 'swr';
import CatalogueItem from '../../components/CatalogueList/CatalogueItem';
import CatalogueList from '../../components/CatalogueList/CatalogueList';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import UserProfile from '../../components/UserProfile/UserProfile';
import User from '../../lib/interfaces/user';
import fetcher from '../../lib/requests/fetchers/fetcher';
import userCataloguesFetcher from '../../lib/requests/fetchers/userCataloguesFetcher';
import userFetcher from '../../lib/requests/fetchers/userFetcher';

import { defaultUser, userLoggedInState, userState } from '../../lib/store/user.store';

export default function ProfilePage() {
  const [loggedInUserState, setLoggedInUserState] = useRecoilState(userState);
  const userLoggedIn = useRecoilValue(userLoggedInState);

  const logoutUser = () => {
    setLoggedInUserState(defaultUser);
  };

  const router = useRouter();

  // React.useEffect(() => {
  //   if (!loggedInUserState.loggedIn) router.replace('/');
  // }, [loggedInUserState]);

  const { data: user, mutate: mutateUser, error: errorUser, isValidating: isValidatingUser } = useSWR('/api/user', userFetcher, {
    initialData: null,
    revalidateOnFocus: false,
    onError: err => {
      if (err?.response?.status === 401) logoutUser();
      else if (err?.response?.status === 403) router.replace(`/email/notconfirmed?email=${err?.response?.data?.email}`);
    },
  });

  const { data: catalogueData, mutate: mutateCatalogues, error: errorCatalogues, isValidating: isValidatingCatalogues } = useSWR(
    user?.id ? [`/api/v1/users/${user.id}/catalogues`, user.id] : null,
    async (url, userId) => await userCataloguesFetcher(userId),
    {
      initialData: null,

      onError: err => {
        if (err?.response?.status === 401) logoutUser();
        else if (err?.response?.status === 403) router.replace(`/email/notconfirmed?email=${err?.response?.data?.email}`);
      },
    },
  );

  const loadingUser = !user || isValidatingUser;
  const loadingCatalogues = !catalogueData || isValidatingCatalogues;
  return (
    <>
      <Row className="justify-content-center">
        <Col md="8" className="text-center">
          {!loggedInUserState.loggedIn ? (
            <Link href="/login">Register now to get a profile</Link>
          ) : (
            <>
              {errorUser ? (
                <h5>Error getting user data</h5>
              ) : loadingUser ? (
                <LoadingSpinner />
              ) : (
                <UserProfile user={user} mutateUser={mutateUser} editable={true}></UserProfile>
              )}

              {errorCatalogues ? (
                <h5>Error getting user catalogues</h5>
              ) : loadingCatalogues ? null : (
                <>
                  <hr></hr>
                  <h4 style={{ marginLeft: '35px' }} className="text-left">
                    Catalogues
                  </h4>
                  <br></br>
                  <CatalogueList
                    catalogues={catalogueData.catalogues}
                    onItemClicked={catalogueId => {
                      router.push(`/catalogue/${catalogueId}`);
                    }}
                  ></CatalogueList>
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
