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
          <br></br>
          <h6>A Confirmation Email Has Been Sent To {email}</h6>

          <Button
            size="sm"
            variant="dark"
            disabled={buttonDisabled}
            onClick={() => {
              sendConfirmationEmail();
            }}
            style={{ marginBottom: '10px' }}
          >
            Resend
          </Button>
          <br></br>
          {buttonDisabled ? <span>You can try again in 30 seconds</span> : null}
        </Col>
      </Row>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const email: string = context.query.email as string;
  return { props: { email: email } };
};
