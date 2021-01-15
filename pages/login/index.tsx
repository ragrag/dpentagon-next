import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { userState } from '../../lib/store/user.store';
import Link from 'next/link';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('email is required'),
  password: Yup.string().required('password is required'),
});

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [credentialError, setCredentialError] = React.useState(false);
  const [error, setError] = React.useState({
    status: false,
    message: '',
  });
  const [emailNotFoundError, setEmailNotFoundError] = React.useState(false);
  const clearErrors = () => {
    setCredentialError(false);
    setError({
      status: false,
      message: '',
    });
    setEmailNotFoundError(false);
  };
  return (
    <Row className={`justify-content-md-center h-100`} style={{ minHeight: '100vh', height: '100vh', backgroundColor: '#e9dccc' }}>
      <Col md="6">
        <br></br>
        {credentialError ? <div style={{ color: '#FF0000' }}> Invalid Email/Password Combination</div> : null}
        {emailNotFoundError ? <div style={{ color: '#FF0000' }}>A User with this email doesn't exist</div> : null}
        {error.status ? <div style={{ color: '#FF0000' }}>{error.message ? error.message : `Something went wrong, please try again`}</div> : null}
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={async values => {
            // same shape as initial values
            try {
              clearErrors();
              console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/login`);
              const response = await axios.post(
                `http://localhost:3001/api/v1/auth/login`,
                {
                  email: values.email,
                  password: values.password,
                },
                { withCredentials: true },
              );
              setUser({
                loggedIn: true,
                id: response.data.id,
                email: response.data.email,
              });
              router.replace(`/`);
            } catch (err) {
              if (err.response?.status === 401) {
                setCredentialError(true);
              } else if (err.response?.status === 403) {
                router.replace(`/email/notconfirmed?email=${values.email}`);
              } else if (err.response?.status === 404) {
                setEmailNotFoundError(true);
              } else if (err.response?.status === 400) {
                setError({
                  status: true,
                  message: err.response?.data?.message,
                });
              }
            }
          }}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ errors, handleSubmit, handleChange, handleBlur, values, isSubmitting }) => (
            <Form
              noValidate
              onSubmit={e => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={(e: any) => handleChange(e)}
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  required
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email ? <div style={{ color: '#FF0000' }}> {errors.email}</div> : null}
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password ? <div style={{ color: '#FF0000' }}>{errors.password}</div> : null}
              </Form.Group>
              <Row className="justify-content-center">
                <Button variant="dark" className="text-center" type="submit" style={{ backgroundColor: '#000000' }} disabled={isSubmitting}>
                  Login
                </Button>
              </Row>
            </Form>
          )}
        </Formik>
        <br></br>
        <Link href="/register">
          <h4 className="text-center hoverable" style={{ color: '#000000' }}>
            Create a new account
          </h4>
        </Link>
      </Col>
    </Row>
  );
}
