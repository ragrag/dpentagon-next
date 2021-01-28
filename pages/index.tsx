import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { CountryDropdown } from 'react-country-region-selector';
import { useSWRInfinite } from 'swr';
import AdSection from '../components/AdSection/AdSection';
import NavBar from '../components/Header/NavBar/NavBar';
import LoadingSpinner from '../components/Loading/LoadingSpinner';
import PaginatedPostList from '../components/Post/PaginatedPostList';
import postsFetcher from '../lib/requests/fetchers/postsFetcher';

export default function Home() {
  const [filterCountry, setFilterCountry] = React.useState('');

  const router = useRouter();
  React.useEffect(() => {
    setFilterCountry('');
  }, [router.query.profession, router.query.caption, router.query.userType]);
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.hasMore) return null;
    return ['/api/v1/posts', pageIndex + 1, 20, router.query.profession, router.query.country, router.query.caption, router.query.userType]; // SWR key
  };

  const { data, size, setSize, isValidating, error } = useSWRInfinite(
    getKey,
    async (url, page, limit, profession, country, caption, userType) =>
      await postsFetcher(url, { page, limit, profession, country, caption, userType }),
    { revalidateOnFocus: false, refreshInterval: 0, revalidateAll: true },
  );

  const loading = isValidating || !data;

  return (
    <>
      <Head>
        <title>DPentagon- HOME</title>
        <meta name="google-site-verification" content="xGEkR0e2RGxbtsCLEX6n_3KKGi0vENY9EYCvQAta_P4" />
      </Head>
      <div>
        <NavBar></NavBar>
        <br></br>
        <Row className="justify-content-md-center">
          <Col className="text-center" md="8">
            <AdSection />
          </Col>
        </Row>
        <br></br>
        <Row className="justify-content-center">
          <Col md="8" className="my-auto text-center">
            <Row className="justify-content-md-left" style={{ fontSize: 12 }}>
              <Col className="text-left" md="6">
                <span className="text-left">Filter By Country: </span>
                <CountryDropdown
                  value={filterCountry}
                  onChange={val => {
                    setFilterCountry(val);
                    router.query.country = val;
                    // console.log(router.query);
                  }}
                  name="country"
                />
              </Col>
            </Row>
            <br></br>
            {!data ? null : data[0]?.posts?.length === 0 ? (
              <>
                <br></br>
                <h4 className="text-center" key="no-post">
                  No posts to show
                </h4>
              </>
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
