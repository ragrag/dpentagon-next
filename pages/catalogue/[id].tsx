import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import useSWR, { useSWRInfinite } from 'swr';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import NewPostModal from '../../components/Post/NewPostModal';
import PaginatedPostList from '../../components/Post/PaginatedPostList';
import catalogueByIdFetcher from '../../lib/requests/fetchers/catalogueFetcherById';
import cataloguePostsFetcher from '../../lib/requests/fetchers/cataloguePostsFetcher';
import readImageFromFile from '../../lib/util/readImage';

export default function CataloguePage({ catalogueId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [newPostModalVisible, setNewPostModalVisible] = React.useState(false);

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
                <FontAwesomeIcon onClick={() => setNewPostModalVisible(true)} className="hoverable" size="2x" color="#000" icon={faPlusCircle} />
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
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const catalogueId = Number(context.params.id);
  return { props: { catalogueId } };
};
