import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, Col, Modal, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import useSWR, { useSWRInfinite } from 'swr';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import NewPostModal from '../../components/Post/NewPostModal';
import PaginatedPostList from '../../components/Post/PaginatedPostList';
import catalogueByIdFetcher from '../../lib/requests/fetchers/catalogueFetcherById';
import cataloguePostsFetcher from '../../lib/requests/fetchers/cataloguePostsFetcher';
import deleteCatalogueRequest from '../../lib/requests/mutators/deleteCatalogueRequest';
import updateCatalogueRequest from '../../lib/requests/mutators/updateCatalogueRequest';
import { userState } from '../../lib/store/user.store';
import readImageFromFile from '../../lib/util/readImage';

export default function CataloguePage({ catalogueId, initialCatalogue }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [newPostModalVisible, setNewPostModalVisible] = React.useState(false);
  const coverImageInput = React.useRef(null);
  const [updatingCoverPhoto, setUpdatingCoverPhoto] = React.useState(false);
  const [coverEditVisible, setCoverEditVisible] = React.useState(false);
  const [deletionModalVisible, setDeletionModalVisible] = React.useState(false);

  const catalogueDeletionModal = (
    <Modal
      onHide={() => setDeletionModalVisible(false)}
      size="sm"
      show={deletionModalVisible}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Delete Catalogue?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>Are you sure you want to delete this catalogue?</span>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant={'dark'} onClick={() => setDeletionModalVisible(false)}>
          Close
        </Button>
        <Button
          onClick={async () => {
            try {
              await deleteCatalogueRequest(catalogue.id);
              setDeletionModalVisible(false);
              router.replace(`/user/profile`);
            } catch (err) {
              if (err?.response?.status === 401) alert('Unauthorized');
              else alert('Failed to delete catalogue');
            }
          }}
          size="sm"
          variant={'dark'}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const [newPost, setNewPost] = React.useState({
    caption: '',
    image: {
      content: '',
      file: '',
    },
    catalogueId: catalogueId,
  });

  const { data: catalogue, mutate: mutateCatalogue, error: errorCatalogue, isValidating: isValidatingCatalogue } = useSWR(
    [`/api/v1/catalogues/${catalogueId}/catalogues`, catalogueId],
    async (url, catalogueId) => await catalogueByIdFetcher(catalogueId),

    {
      initialData: initialCatalogue,
      revalidateOnFocus: false,
    },
  );

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.hasMore) return null;
    return catalogue?.id ? [`/api/v1/catalogues/${catalogueId}/posts`, catalogueId, pageIndex + 1, 20] : null; // SWR key
  };

  const { data: postsData, size, setSize, mutate: mutatePostsData, isValidating: isValidatingPostsData } = useSWRInfinite(
    getKey,
    async (url, catalogueId, page, limit) => await cataloguePostsFetcher(url, catalogueId, { page, limit }),
    { revalidateOnFocus: false, refreshInterval: 0 },
  );

  const loadingCatalogue = !catalogue || isValidatingCatalogue;
  const loadingPosts = !postsData || isValidatingPostsData;

  const updateCoverPhoto = async e => {
    setUpdatingCoverPhoto(true);
    setCoverEditVisible(false);
    const image = await readImageFromFile(e.target.files[0]);

    try {
      const newCataloguePhotoUrl = await updateCatalogueRequest(catalogue.id, { name: catalogue.name, photo: image.base64 });

      mutateCatalogue(
        {
          ...catalogue,
          photo: newCataloguePhotoUrl,
        },
        false,
      );
      setUpdatingCoverPhoto(false);
    } catch (err) {}
  };
  return (
    <>
      <Head>
        {catalogue ? (
          <>
            <title>{catalogue.name + ' by ' + catalogue.user.displayName}</title>
            <meta property="og:title" content={catalogue.name + ' by ' + catalogue.user.displayName} />
            <meta property="og:description" content={'Check out ' + catalogue.name + ' by ' + catalogue.user.displayName} />
            <meta property="og:image" content={catalogue.photo} />
            <meta property="og:url" content={`www.dpentagon.com/catalogue/${catalogue.id}`} />
            <meta name="twitter:card" content={'Check out ' + catalogue.name + ' by ' + catalogue.user.displayName} />
            <meta property="og:site_name" content="DPentagon" />
          </>
        ) : (
          <>
            <title>DPentagon - Catalogue</title>
          </>
        )}
      </Head>
      <Row className="justify-content-center">
        <Col md="8" className="text-center">
          {loadingCatalogue ? (
            <LoadingSpinner />
          ) : (
            <>
              {updatingCoverPhoto ? (
                <LoadingSpinner />
              ) : (
                <Row className="justify-content-center">
                  <Col>
                    <div>
                      <Image src={catalogue.photo ? catalogue.photo : '/cover.jpeg'} width="820" height="312" />
                    </div>
                    {catalogue.user.id === user?.id ? (
                      <OverlayTrigger
                        placement={'bottom'}
                        show={coverEditVisible}
                        overlay={
                          <Popover id={`popover-positioned-bottom-catalogue`} onMouseLeave={() => setCoverEditVisible(false)}>
                            <Popover.Content>
                              <Row className="justify-content-center">
                                <Col className="text-center">
                                  <Button
                                    size="sm"
                                    variant="dark"
                                    onClick={() => {
                                      coverImageInput.current.click();
                                    }}
                                    style={{ marginBottom: '10px' }}
                                  >
                                    Upload Image
                                  </Button>
                                  {/* <br></br>
                                  <Button
                                    onClick={() => {
                                      deleteCoverPhoto();
                                    }}
                                    size="sm"
                                    variant="danger"
                                  >
                                    Delete Image
                                  </Button> */}
                                </Col>
                              </Row>
                            </Popover.Content>
                          </Popover>
                        }
                      >
                        <Button
                          className="text-right hoverable-opacity"
                          variant="dark"
                          size="sm"
                          onClick={() => setCoverEditVisible(true)}
                          style={{
                            margin: '-90px 10px 0px 50px',
                            left: '35%',
                            zIndex: 9,
                            position: 'relative',
                            opacity: 0.5,
                          }}
                        >
                          Add Photo
                        </Button>
                      </OverlayTrigger>
                    ) : null}
                  </Col>
                </Row>
              )}

              <Row>
                <Col className="text-left">
                  <span style={{ fontWeight: 'bold', fontSize: 28 }} className="text-left">
                    {catalogue.name}
                  </span>
                  {catalogue.user.id === user?.id ? (
                    <FontAwesomeIcon
                      style={{ marginLeft: '10px', marginBottom: '4px' }}
                      onClick={() => setDeletionModalVisible(true)}
                      className="hoverable"
                      size="lg"
                      color="#000"
                      icon={faTrashAlt}
                    />
                  ) : null}
                  <br></br>
                  <Link href={`/user/${catalogue.user.id}`}>
                    <span className="hoverable-anchor" style={{ fontWeight: 500, fontSize: 22 }}>
                      by {catalogue.user.displayName}
                    </span>
                  </Link>
                </Col>
              </Row>

              {catalogue.user.id === user?.id ? (
                <Row>
                  <Col className="text-right">
                    <FontAwesomeIcon
                      onClick={() => setNewPostModalVisible(true)}
                      className="hoverable"
                      size="lg"
                      color="#000"
                      icon={faPlusCircle}
                      style={{ marginRight: '10px' }}
                    />
                  </Col>
                </Row>
              ) : null}
              <NewPostModal
                newPost={newPost}
                setNewPost={setNewPost}
                visible={newPostModalVisible}
                setModalVisibility={setNewPostModalVisible}
                mutatePostsData={mutatePostsData}
                postsData={postsData}
              ></NewPostModal>
              <Row className="justify-content-center">
                <Col md="12" className="my-auto text-center">
                  {!postsData ? null : postsData[0]?.posts?.length === 0 ? (
                    <h4 className="text-center" key="no-post">
                      No posts to show
                    </h4>
                  ) : (
                    <div>
                      <PaginatedPostList data={postsData} size={size} setSize={setSize}></PaginatedPostList>
                    </div>
                  )}

                  <br></br>

                  {loadingPosts ? <LoadingSpinner /> : null}
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
      <input
        type="file"
        ref={coverImageInput}
        onChange={async e => {
          await updateCoverPhoto(e);
        }}
        style={{ display: 'none' }}
        name="coverImage"
        accept="image/*"
      />
      {catalogueDeletionModal}
    </>
  );
}

export const getServerSideProps = async context => {
  const catalogueId = Number(context.params.id);
  try {
    const initialCatalogue = await catalogueByIdFetcher(catalogueId);
    return { props: { catalogueId, initialCatalogue } };
  } catch (err) {
    return { props: { catalogueId, initialCatalogue: null } };
  }
};
