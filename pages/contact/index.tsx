import kwesforms from 'kwesforms';
import Head from 'next/head';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
export default function ContactFormPage() {
  React.useEffect(() => {
    kwesforms.init();
  }, []);
  return (
    <>
      <Head>
        <title>DPentagon - Contact Us</title>
        <meta property="og:title" content="DPentagon - Contact Us" />
        <meta property="og:description" content="DPentagon - Contact Us" />
        <meta property="og:url" content="www.dpentagon.com/contact" />
        <meta name="twitter:card" content="DPentagon - Contact Us" />
        <meta property="og:site_name" content="DPentagon" />
      </Head>
      <Row className="justify-content-center h-100" style={{ minHeight: '100vh', height: '100vh' }}>
        <Col md="6" className="text-center">
          <Form className="kwes-form" action="https://kwes.io/api/foreign/forms/SV53VAl9pjULOrCnViZu">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control as="input" name="email" type="email" required />
            </Form.Group>

            <Form.Group controlId="formBasicMessage">
              <Form.Label>How can we help you</Form.Label>
              <Form.Control name="message" type="text" as="textarea" required />
            </Form.Group>

            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}
