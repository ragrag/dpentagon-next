import Head from 'next/head';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import * as yup from 'yup';
import requestPasswordReset from '../../lib/requests/mutators/requestPasswordReset';

export default function PasswordForgetPage() {
  const [email, setEmail] = React.useState('');
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  // React.

  const resetButton = () => {
    setButtonDisabled(true);
    setTimeout(() => setButtonDisabled(false), 30000);
  };
  const isEmailValid = () => {
    const schema = yup.string().email().required();
    return schema.isValidSync(email);
  };
  const sendPasswordResetEmail = async () => {
    try {
      if (!isEmailValid()) {
        alert('Invalid email address');
        return;
      }
      await requestPasswordReset(email);
      resetButton();
    } catch (err) {
      if (err?.response?.status === 404) alert("Failed to send password reset link, User with this email doesn't exist");
      else alert('Failed to send password reset link, try again later');
    }
  };

  return (
    <>
      <Head>
        <title>DPentagon</title>
      </Head>
      <Row className={`justify-content-md-center h-100`} style={{ minHeight: '100vh', height: '100vh', backgroundColor: '#e9dccc' }}>
        <Col md="4" className="text-center">
          <br></br>
          <h6>Enter your email and a password reset link will be sent</h6>

          <Form.Control
            className="text-center"
            name="email"
            style={{
              backgroundColor: '#FFFFFF',
            }}
            plaintext
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          <br></br>
          <Button
            size="sm"
            variant="dark"
            disabled={buttonDisabled}
            onClick={() => {
              sendPasswordResetEmail();
            }}
            style={{ marginBottom: '10px' }}
          >
            Send Password Reset
          </Button>
          <br></br>
          {buttonDisabled ? <span>You can try again in 30 seconds</span> : null}
        </Col>
      </Row>
    </>
  );
}
