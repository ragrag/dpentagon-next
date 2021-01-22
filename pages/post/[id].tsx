import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import useSWR from 'swr';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import PostItem from '../../components/Post/PostItem';
import UserContactInfo from '../../components/UserProfile/UserContactInfo';
import Post from '../../lib/interfaces/post';
import postByIdFetcher from '../../lib/requests/fetchers/postByIdFetcher';

export default function PostPage({ postId, initialPost }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [modalVisible, setModalVisibility] = React.useState(false);

  const { data: post, error: postError, isValidating: isValidatingPost } = useSWR(
    [`/api/v1/posts/${postId}`, postId],
    async (url, postId) => {
      const post = await postByIdFetcher(postId);
      return post;
    },
    { initialData: initialPost, revalidateOnFocus: false },
  );

  const loading = !post || isValidatingPost;

  return (
    <>
      <Head>
        {post ? (
          <>
            <title>{(post.caption ? post.caption : 'Post') + ' by ' + post.catalogue.user.displayName}</title>
            <meta property="og:title" content={(post.caption ? post.caption : 'Post') + ' by ' + post.catalogue.user.displayName} />
            <meta
              property="og:description"
              content={'Check out ' + (post.caption ? post.caption : 'a post') + ' by ' + post.catalogue.user.displayName}
            />
            <meta property="og:image" content={post.url} />
            <meta property="og:url" content={`www.dpentagon.com/post/${post.id}`} />
            <meta name="twitter:card" content={'Check out ' + (post.caption ? post.caption : 'a post') + ' by ' + post.catalogue.user.displayName} />
            <meta property="og:site_name" content="DPentagon" />
          </>
        ) : (
          <>
            <title>DPentagon - Catalogue</title>
          </>
        )}
      </Head>
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

export const getServerSideProps = async context => {
  const postId = Number(context.params.id as string);
  try {
    const initialPost: Post = await postByIdFetcher(postId);
    return { props: { postId, initialPost } };
  } catch (err) {
    return { props: { postId, initialPost: null } };
  }
};
