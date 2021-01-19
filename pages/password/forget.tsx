import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import requestEmailConfirmation from '../../lib/requests/mutators/requestEmailConfirmation';
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
      <Row className={`justify-content-md-center h-100`} style={{ minHeight: '100vh', height: '100vh', backgroundColor: '#e9dccc' }}>
        <Col md="4" className="text-center">
          <h5>Enter your email and a password reset link will be sent</h5>

          <Form.Control
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
            variant="dark"
            disabled={buttonDisabled}
            onClick={() => {
              sendPasswordResetEmail();
            }}
          >
            Send Password Reset
          </Button>
          {buttonDisabled ? <h6>You can try again in 30 seconds</h6> : null}
        </Col>
      </Row>
    </>
  );
}
