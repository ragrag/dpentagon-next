import React from 'react';
import { Col, Row } from 'react-bootstrap';
import AdSection from '../components/AdSection/AdSection';
import NavBar from '../components/Header/NavBar/NavBar';
export default function Home() {
  return (
    <div>
      <br></br>
      <NavBar></NavBar>
      <Row className="justify-content-md-center">
        <Col className="text-center" md="8">
          <AdSection />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="8"></Col>
      </Row>
    </div>
  );
}
