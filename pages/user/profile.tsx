import { faCircleNotch, faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, Col, Form, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSWR from 'swr';
import CatalogueList from '../../components/CatalogueList/CatalogueList';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import UserProfile from '../../components/UserProfile/UserProfile';
import userCataloguesFetcher from '../../lib/requests/fetchers/userCataloguesFetcher';
import userFetcher from '../../lib/requests/fetchers/userFetcher';
import { defaultUser, userLoggedInState, userState } from '../../lib/store/user.store';
import createPhotoPostRequest from '../../lib/requests/mutators/createCatalogueRequest';
import * as yup from 'yup';
import createCatalogueRequest from '../../lib/requests/mutators/createPhotoPostRequest';
const schema = yup.string().email().required();
export default function ProfilePage() {
  const [loggedInUserState, setLoggedInUserState] = useRecoilState(userState);
  const userLoggedIn = useRecoilValue(userLoggedInState);
  const newCatalogue = React.useRef(null);
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
                  </h4>{' '}
                  <Col className="text-right">
                    <OverlayTrigger
                      placement={'bottom'}
                      trigger="click"
                      overlay={
                        <Popover id={`popover-positioned-bottom`}>
                          <Popover.Content>
                            <Row className="justify-content-center">
                              <Col className="text-center">
                                <Form.Group controlId="formBasicPassword">
                                  <Form.Control
                                    name="catalogueName"
                                    type="text"
                                    placeholder="Catalogue Name"
                                    ref={newCatalogue}
                                    onClick={() => {
                                      console.log(newCatalogue.current.value);
                                    }}
                                  />
                                </Form.Group>
                                <Button
                                  variant="dark"
                                  size="sm"
                                  onClick={async () => {
                                    const schema = yup.string().min(1).required();
                                    if (!schema.isValidSync(newCatalogue.current.value)) {
                                      alert('Invalid catalogue name');
                                      return;
                                    }
                                    try {
                                      const createdCatalogue = await createCatalogueRequest(newCatalogue.current.value);
                                      mutateCatalogues(
                                        {
                                          hasMore: catalogueData.hasMore,
                                          catalogues: [createdCatalogue, ...catalogueData.catalogues],
                                        },
                                        true,
                                      );
                                    } catch (err) {
                                      alert('Catalogue creation failed');
                                    }
                                  }}
                                >
                                  Add Catalogue
                                </Button>
                              </Col>
                            </Row>
                          </Popover.Content>
                        </Popover>
                      }
                    >
                      <FontAwesomeIcon className="hoverable" size="lg" color="#000" icon={faPlusCircle} />
                    </OverlayTrigger>
                  </Col>
                  <br></br>
                  <Row className="justify-content-center">
                    <Col className="text-center" md="10">
                      <CatalogueList
                        catalogues={catalogueData.catalogues}
                        onItemClicked={catalogueId => {
                          router.push(`/catalogue/${catalogueId}`);
                        }}
                      ></CatalogueList>
                    </Col>
                  </Row>
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
