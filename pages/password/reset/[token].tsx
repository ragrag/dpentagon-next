import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import resetPassword from '../../../lib/requests/mutators/resetPassword';
import * as yup from 'yup';
import { useRouter } from 'next/router';

export default function PasswordResetPage({ token }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [redirecting, setRedirecting] = React.useState(false);

  // React.
  const redirectToLogin = () => {
    router.replace('/login');
  };

  const isPasswordValid = () => {
    const schema = yup.string().min(6).required();
    if (password !== confirmPassword) {
      alert("Password don't match");
      return false;
    }
    if (!schema.isValidSync(password)) {
      alert('Invalid password, must be atleast 6 characters');
      return false;
    }
    return true;
  };

  const requestPasswordReset = async () => {
    try {
      if (!isPasswordValid()) {
        return;
      }
      await resetPassword(token, password);
      setRedirecting(true);
      setTimeout(redirectToLogin, 5000);
    } catch (err) {
      alert('Failed to reset password, try again later');
    }
  };

  return (
    <>
      <Row className={`justify-content-md-center h-100`} style={{ minHeight: '100vh', height: '100vh', backgroundColor: '#e9dccc' }}>
        <Col md="4" className="text-center">
          {redirecting ? (
            <h6>Password reset success!, redirecting you to login page shortly...</h6>
          ) : (
            <>
              <h5>Enter your new password</h5>

              <span className="text-center">New Password</span>
              <Form.Control
                name="password"
                type="password"
                style={{
                  backgroundColor: '#FFFFFF',
                }}
                plaintext
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
              <br></br>
              <span className="text-center">Confirm New Password</span>
              <Form.Control
                name="confirmPassword"
                type="password"
                style={{
                  backgroundColor: '#FFFFFF',
                }}
                plaintext
                value={confirmPassword}
                onChange={e => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <br></br>
              <Button
                variant="dark"
                onClick={() => {
                  requestPasswordReset();
                }}
              >
                Send Password Reset
              </Button>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async context => {
  const token: string = context.params.token as string;
  return { props: { token } };
};
