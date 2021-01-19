import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import useSWR, { useSWRInfinite } from 'swr';
import AdSection from '../components/AdSection/AdSection';
import NavBar from '../components/Header/NavBar/NavBar';
import LoadingSpinner from '../components/Loading/LoadingSpinner';
import postsFetcher, { PostsFetchQuery } from '../lib/requests/fetchers/postsFetcher';
import { makeStyles } from '@material-ui/core/styles';

import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroll-component';
import StackGrid, { transitions } from 'react-stack-grid';
const { scaleDown } = transitions;

const randomHeightsMap: Map<number, number> = new Map<number, number>();

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
  console.log(data, size);
  // const { data: postData, isValidating, error } = useSWR(
  //   ['/api/v1/posts', page, limit, router.query.profession, router.query.country, router.query.caption, router.query.userType],
  //   async (url, page, limit, profession, country, caption, userType) =>
  //     await postsFetcher(url, { page, limit, profession, country, caption, userType }),
  //   { revalidateOnFocus: false, refreshInterval: 0 },
  // );
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
                <InfiniteScroll
                  dataLength={data.reduce((prev, cur) => {
                    return prev + cur.posts.length;
                  }, 0)} //This is important field to render the next data
                  next={() => {
                    setSize(size + 1);
                  }}
                  hasMore={data[data.length - 1].hasMore}
                  loader={null}
                >
                  {/* <div id="post-grid">
                    <StackGrid
                      columnWidth={250}
                      appear={scaleDown.appear}
                      appeared={scaleDown.appeared}
                      enter={scaleDown.enter}
                      entered={scaleDown.entered}
                      leaved={scaleDown.leaved}
                    > */}
                  {data.map((postData, index) => {
                    return postData.posts.map(post => {
                      let randomHeight;
                      if (randomHeightsMap.get(post.id)) randomHeight = randomHeightsMap.get(post.id);
                      else {
                        randomHeight = Math.floor(120 + Math.random() * (250 + 1 - 120));
                        randomHeightsMap.set(post.id, randomHeight);
                      }
                      return <Image layout="fixed" key={post.id} width={250} height={250} src={post.url} alt={post.caption} />;
                    });
                  })}{' '}
                  {/* </StackGrid>
                  </div> */}
                </InfiniteScroll>
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
