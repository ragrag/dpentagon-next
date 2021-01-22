import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import useSWR from 'swr';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import PostItem from '../../components/Post/PostItem';
import UserContactInfo from '../../components/UserProfile/UserContactInfo';
import postByIdFetcher from '../../lib/requests/fetchers/postByIdFetcher';

export default function PostPage({ postId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [modalVisible, setModalVisibility] = React.useState(false);

  const { data: post, error: postError, isValidating: isValidatingPost } = useSWR(
    [`/api/v1/posts/${postId}`, postId],
    async (url, postId) => {
      const post = await postByIdFetcher(postId);
      return post;
    },
    { initialData: null },
  );

  const loading = !post || isValidatingPost;

  return (
    <>
      <br></br>
      <Row className={`justify-content-md-center`} style={{ overflow: 'auto' }}>
        <Col className="text-center" md="8" xs="8">
          {loading ? (
            <LoadingSpinner />
          ) : postError ? (
            <h6>Error getting post</h6>
          ) : (
            <>
              <PostItem setUserModalVisibility={setModalVisibility} width={500} height={500} post={post}></PostItem>
              <UserContactInfo
                visible={modalVisible}
                setModalVisibility={setModalVisibility}
                user={post.catalogue.user}
                readOnly={true}
              ></UserContactInfo>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const postId = Number(context.params.id as string);
  return { props: { postId } };
};
