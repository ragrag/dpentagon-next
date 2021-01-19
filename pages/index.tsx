import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSWRInfinite } from 'swr';
import AdSection from '../components/AdSection/AdSection';
import NavBar from '../components/Header/NavBar/NavBar';
import LoadingSpinner from '../components/Loading/LoadingSpinner';
import PaginatedPostList from '../components/PostList/PaginatedPostList';
import postsFetcher from '../lib/requests/fetchers/postsFetcher';

export default function Home() {
  const router = useRouter();
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.hasMore) return null;
    return ['/api/v1/posts', pageIndex + 1, 20, router.query.profession, router.query.country, router.query.caption, router.query.userType]; // SWR key
  };

  const { data, size, setSize, isValidating, error } = useSWRInfinite(
    getKey,
    async (url, page, limit, profession, country, caption, userType) =>
      await postsFetcher(url, { page, limit, profession, country, caption, userType }),
    { revalidateOnFocus: false, refreshInterval: 0 },
  );

  const loading = isValidating || !data;

  return (
    <>
      <Head>
        <title>DPentagon- HOME</title>
      </Head>
      <div>
        <NavBar></NavBar>

        <Row className="justify-content-md-center">
          <Col className="text-center" md="8">
            <AdSection />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8" className="my-auto text-center">
            {!data ? null : data[0]?.posts?.length === 0 ? (
              <h4 className="text-center" key="no-post">
                No posts to show
              </h4>
            ) : (
              <div>
                <PaginatedPostList data={data} size={size} setSize={setSize}></PaginatedPostList>
              </div>
            )}

            <br></br>

            {loading ? <LoadingSpinner /> : null}
          </Col>
        </Row>
      </div>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
      `}</style>
    </>
  );
}
