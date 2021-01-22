import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import useSWR from 'swr';
import CatalogueList from '../../components/CatalogueList/CatalogueList';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import UserProfile from '../../components/UserProfile/UserProfile';
import User from '../../lib/interfaces/user';
import userByIdFetcher from '../../lib/requests/fetchers/userByIdFetcher';
import userCataloguesFetcher from '../../lib/requests/fetchers/userCataloguesFetcher';

export default function UserPage({ userId, initialUser }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const { data: user, mutate: mutateUser, error: errorUser, isValidating: isValidatingUser } = useSWR(
    [`/api/users/${userId}`, userId],
    async (url, userId) => await userByIdFetcher(userId),
    {
      initialData: initialUser,
      revalidateOnFocus: false,
    },
  );

  const { data: catalogueData, error: errorCatalogues, isValidating: isValidatingCatalogues } = useSWR(
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
      <Head>
        {user ? (
          <>
            <title>{user.displayName} on DPentagon</title>
            <meta property="og:title" content={user.displayName + ' on DPentagon'} />
            <meta property="og:description" content={'Check out ' + user.displayName + ' on DPentagon'} />
            <meta property="og:image" content={user.photo} />
            <meta property="og:url" content={`www.dpentagon.com/user/${user.id}`} />
            <meta name="twitter:card" content={'Check out ' + user.displayName + ' on DPentagon'} />
            <meta property="og:site_name" content="DPentagon" />
          </>
        ) : (
          <>
            <title>DPentagon - User</title>
          </>
        )}
      </Head>
      <Row className="justify-content-center h-100" style={{ minHeight: '100vh', height: '100vh' }}>
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
      <br></br>
      <br></br>
    </>
  );
}

export const getServerSideProps = async context => {
  const userId = context.params.id;
  try {
    const initialUser: User = await userByIdFetcher(userId);
    return { props: { userId: userId, initialUser } };
  } catch (err) {
    return { props: { userId: userId, initialUser: null } };
  }
};
