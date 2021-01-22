import { useRouter } from 'next/router';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import StepZilla from 'react-stepzilla';
import useSWR from 'swr';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import AccountTypeForm from '../../components/RegistrationForm/AccountTypeForm';
import BasicInformationForm from '../../components/RegistrationForm/BasicInformationForm';
import ContactInformation from '../../components/RegistrationForm/ContactInformation';
import EmailPasswordForm from '../../components/RegistrationForm/EmailPasswordForm';
import ReviewForm from '../../components/RegistrationForm/ReviewForm';
import professionsFetcher from '../../lib/requests/fetchers/professionsFetcher';
import { RegisterUserDTO } from '../../lib/requests/mutators/userRegister';
export default function RegisterPage() {
  const router = useRouter();

  const redirectToLogin = () => {
    router.replace('/login');
  };

  const { data: professions, error: errorProfessions, isValidating: isValidatingProfesisons } = useSWR('/api/v1/professions', professionsFetcher, {
    initialData: null,
  });

  const loading = !professions || isValidatingProfesisons;

  const [registrationData, setRegistrationData] = React.useState<RegisterUserDTO>({
    country: '',
    displayName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: null,
    professionId: null,
    userType: 'freelancer',
    website: '',
  });
  const steps = [
    {
      name: 'Account Type',
      component: <AccountTypeForm professions={professions} registrationData={registrationData} setRegistrationData={setRegistrationData} />,
    },
    { name: 'Basic Information', component: <BasicInformationForm registrationData={registrationData} setRegistrationData={setRegistrationData} /> },
    { name: 'Contact Information', component: <ContactInformation registrationData={registrationData} setRegistrationData={setRegistrationData} /> },
    { name: 'Account Information', component: <EmailPasswordForm registrationData={registrationData} setRegistrationData={setRegistrationData} /> },
    { name: 'Review', component: <ReviewForm redirectToLogin={redirectToLogin} registrationData={registrationData} professions={professions} /> },
  ];
  return (
    <>
      <Row className={`justify-content-md-center h-100`} style={{ minHeight: '100vh', height: '100vh', backgroundColor: '#e9dccc' }}>
        <Col className="text-center" md="12" xs="12">
          <br></br>
          <h3 className="bold-text">Welcome to D.Pentagon</h3>
          <h4>Create your catalogue</h4>

          {loading ? (
            <LoadingSpinner />
          ) : errorProfessions ? (
            <h6>Error getting registration data, try again later</h6>
          ) : (
            <div className="step-progress">
              <StepZilla
                steps={steps}
                nextButtonCls="wizard-btn btn btn-prev btn-dark btn-sm"
                backButtonCls="wizard-btn btn btn-next btn-dark btn-sm"
              />
            </div>
          )}
          <br></br>
        </Col>
      </Row>
      <style jsx>{`
        .wizard-btn {
          margin-right: 10px !imporant;
        }
      `}</style>
    </>
  );
}
