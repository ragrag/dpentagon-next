import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import LoadingSpinner from '../../../components/Loading/LoadingSpinner';
import confirmEmail from '../../../lib/requests/mutators/confirmEmail';

export default function EmailNotConfirmedPage({ token }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  // React.
  const router = useRouter();

  const redirectToLogin = () => {
    router.replace('/login');
  };
  const sendEmailConfirmation = async () => {
    try {
      await confirmEmail(token);
      setLoading(false);
      setTimeout(redirectToLogin, 5000);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    sendEmailConfirmation();
  }, []);

  return (
    <>
      <Head>
        <title>DPentagon</title>
      </Head>
      <Row className={`justify-content-md-center h-100`} style={{ minHeight: '100vh', height: '100vh', backgroundColor: '#e9dccc' }}>
        <Col md="8" className="text-center">
          <br></br>
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <h6>Error confirming email, try again later</h6>
          ) : (
            <h6>Email confirmed, redirecting you to login page shortly...</h6>
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
