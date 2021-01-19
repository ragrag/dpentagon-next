import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
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
import userByIdFetcher from '../../lib/requests/fetchers/userByIdFetcher';
import userCataloguesFetcher from '../../lib/requests/fetchers/userCataloguesFetcher';
import userFetcher from '../../lib/requests/fetchers/userFetcher';

import { defaultUser, userLoggedInState, userState } from '../../lib/store/user.store';

export default function UserPage({ userId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  // React.useEffect(() => {
  //   if (!loggedInUserState.loggedIn) router.replace('/');
  // }, [loggedInUserState]);

  const { data: user, mutate: mutateUser, error: errorUser, isValidating: isValidatingUser } = useSWR(
    [`/api/users/${userId}`, userId],
    async (url, userId) => await userByIdFetcher(url, userId),
    {
      initialData: null,
      revalidateOnFocus: false,
    },
  );

  const { data: catalogueData, mutate: mutateCatalogues, error: errorCatalogues, isValidating: isValidatingCatalogues } = useSWR(
    user?.id ? [`/api/v1/users/${user.id}/catalogues`, user.id] : null,
    async (url, userId) => await userCataloguesFetcher(userId),
    {
      initialData: null,
    },
  );

  const loadingUser = !user || isValidatingUser;
  const loadingCatalogues = !catalogueData || isValidatingCatalogues;
  return (
    <>
      <Row className="justify-content-center">
        <Col md="8" className="text-center">
          {errorUser ? (
            <h5>Error getting user data</h5>
          ) : loadingUser ? (
            <LoadingSpinner />
          ) : (
            <UserProfile user={user} mutateUser={mutateUser} editable={false}></UserProfile>
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
        </Col>
      </Row>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const userId = context.params.id;
  return { props: { userId: userId } };
};
