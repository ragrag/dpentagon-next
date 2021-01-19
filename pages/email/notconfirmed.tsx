import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import requestEmailConfirmation from '../../lib/requests/mutators/requestEmailConfirmation';

export default function EmailNotConfirmedPage({ email }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  // React.

  const resetButton = () => {
    setButtonDisabled(true);
    setTimeout(() => setButtonDisabled(false), 30000);
  };

  const sendConfirmationEmail = async () => {
    try {
      await requestEmailConfirmation(email);
      resetButton();
    } catch (err) {
      alert('Failed to send email confirmation, try again later');
    }
  };

  React.useEffect(() => {
    sendConfirmationEmail();
  }, []);

  return (
    <>
      <Row className={`justify-content-md-center h-100`} style={{ minHeight: '100vh', height: '100vh', backgroundColor: '#e9dccc' }}>
        <Col md="8" className="text-center">
          <h5>A Confirmation Email Has Been Sent To {email}</h5>

          <Button
            variant="dark"
            disabled={buttonDisabled}
            onClick={() => {
              sendConfirmationEmail();
            }}
          >
            Resend
          </Button>
          {buttonDisabled ? <h6>You can try again in 30 seconds</h6> : null}
        </Col>
      </Row>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const email: string = context.query.email as string;
  return { props: { email: email } };
};
