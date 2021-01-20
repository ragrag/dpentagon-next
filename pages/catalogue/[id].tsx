import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import useSWR, { useSWRInfinite } from 'swr';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import NewPostModal from '../../components/Post/NewPostModal';
import PaginatedPostList from '../../components/Post/PaginatedPostList';
import catalogueByIdFetcher from '../../lib/requests/fetchers/catalogueFetcherById';
import cataloguePostsFetcher from '../../lib/requests/fetchers/cataloguePostsFetcher';
import deleteCatalogueRequest from '../../lib/requests/mutators/deleteCatalogueRequest';
import { userState } from '../../lib/store/user.store';
import readImageFromFile from '../../lib/util/readImage';

export default function CataloguePage({ catalogueId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [newPostModalVisible, setNewPostModalVisible] = React.useState(false);

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
    async (url, catalogueId) => {
      const catalogue = await catalogueByIdFetcher(catalogueId);
      return catalogue;
    },
    {
      initialData: null,
    },
  );

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.hasMore) return null;
    return catalogue?.id ? [`/api/v1/catalogues/${catalogueId}/posts`, catalogueId, pageIndex + 1, 20] : null; // SWR key
  };

  const { data: postsData, size, setSize, mutate: mutatePostsData, isValidating: isValidatingPostsData, error } = useSWRInfinite(
    getKey,
    async (url, catalogueId, page, limit) => await cataloguePostsFetcher(url, catalogueId, { page, limit }),
    { revalidateOnFocus: false, refreshInterval: 0 },
  );

  const loadingCatalogue = !catalogue || isValidatingCatalogue;
  const loadingPosts = !postsData || isValidatingPostsData;
  return (
    <>
      <Row className="justify-content-center">
        <Col md="8" className="text-center">
          {loadingCatalogue ? (
            <LoadingSpinner />
          ) : (
            <>
              <Link href={`/user/${catalogue.user.id}`}>
                <h4 className="text-left hoverable">
                  {catalogue.name} by {catalogue.user.displayName}
                </h4>
              </Link>

              <Col className="text-right">
                <FontAwesomeIcon
                  onClick={() => setNewPostModalVisible(true)}
                  className="hoverable"
                  size="lg"
                  color="#000"
                  icon={faPlusCircle}
                  style={{ marginRight: '10px' }}
                />
                {catalogue.user.id === user?.id ? (
                  <FontAwesomeIcon onClick={() => setDeletionModalVisible(true)} className="hoverable" size="lg" color="#000" icon={faTrashAlt} />
                ) : null}
              </Col>
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
      {catalogueDeletionModal}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const catalogueId = Number(context.params.id);
  return { props: { catalogueId } };
};
