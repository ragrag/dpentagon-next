import Head from 'next/head';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import AdSection from '../components/AdSection/AdSection';
import NavBar from '../components/Header/NavBar/NavBar';
export default function Home() {
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
            <AdSection />
            <AdSection />
            <AdSection />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="8"></Col>
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
