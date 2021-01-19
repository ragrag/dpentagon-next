import { Formik } from 'formik';
import React from 'react';
import userRegister, { RegisterUserDTO } from '../../lib/requests/mutators/userRegister';
import * as Yup from 'yup';
import 'yup-phone';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Profession from '../../lib/interfaces/profession';
import LoadingSpinner from '../Loading/LoadingSpinner';

type Props = {
  registrationData: RegisterUserDTO;
  professions: Profession[];
  redirectToLogin: () => void;
};

const UserRegistrationSchema = Yup.object().shape({
  displayName: Yup.string().min(2).required('Display name is required'),
  country: Yup.string().required('Country is required'),
  phoneNumber: Yup.string().phone(null, true, 'Phone Number must be valid').required('Phone number is required'),
  address: Yup.string().nullable(),
  email: Yup.string().email().required('Email is required'),
  professionId: Yup.number().required('Profession is required'),
  password: Yup.string().min(6).required('Password is required'),
  userType: Yup.string().oneOf(['freelancer', 'company']).required('User type is required'),
});

export default function ReviewForm({ registrationData, professions, redirectToLogin }: Props) {
  const [error, setError] = React.useState({
    status: false,
    message: '',
  });

  const clearErrors = () => {
    setError({
      status: false,
      message: '',
    });
  };
  return (
    <Row className="justify-content-md-center">
      <Col className="text-center" md="5">
        {error.status ? <h6 style={{ color: '#FF0000' }}>{error.message}</h6> : null}

        <Formik
          initialValues={{
            displayName: registrationData.displayName,
            country: registrationData.country,
            phoneNumber: registrationData.phoneNumber,
            address: registrationData.address,
            email: registrationData.email,
            professionId: registrationData.professionId,
            password: registrationData.password,
            userType: registrationData.userType,
          }}
          validationSchema={UserRegistrationSchema}
          onSubmit={async values => {
            // same shape as initial values
            try {
              clearErrors();

              await userRegister(values);
              redirectToLogin();
            } catch (err) {
              if (err?.response?.status === 409 || err?.response?.status === 400) setError({ status: true, message: err.response.data.message });
            }
          }}
          validateOnChange={true}
          validateOnBlur={true}
          validateOnMount={true}
        >
          {({ errors, handleSubmit, handleChange, handleBlur, values, isSubmitting }) =>
            isSubmitting ? (
              <LoadingSpinner />
            ) : (
              <Form
                noValidate
                onSubmit={e => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                {errors.password ? <div style={{ color: '#FF0000' }}> {errors.password}</div> : null}
                <Form.Group as={Row} controlId="formPlaintextAccountType">
                  <Form.Label column sm="4">
                    <span className="bold-text">Email:</span>
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control name="email" plaintext readOnly value={values.email} onChange={handleChange} />
                    {errors.email ? <div style={{ color: '#FF0000' }}> {errors.email}</div> : null}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextAccountType">
                  <Form.Label column sm="4">
                    <span className="bold-text">Account Type:</span>
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control name="userType" plaintext readOnly value={values.userType} onChange={handleChange} />
                    {errors.userType ? <div style={{ color: '#FF0000' }}> {errors.userType}</div> : null}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextProfession">
                  <Form.Label column sm="4">
                    <span className="bold-text">Profession:</span>
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control hidden name="userType" plaintext readOnly value={values.professionId} onChange={handleChange} />
                    <Form.Control name="userTypeShow" plaintext readOnly value={professions.find(el => el.id === values.professionId)?.name} />
                    {errors.professionId ? <div style={{ color: '#FF0000' }}> Invalid Profession Selected</div> : null}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextDisplayName">
                  <Form.Label column sm="4">
                    <span className="bold-text">{values.userType === 'freelancer' ? '' : 'Company'} Name:</span>
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control name="displayName" plaintext readOnly value={values.displayName} onChange={handleChange} />
                    {errors.displayName ? <div style={{ color: '#FF0000' }}> {errors.displayName}</div> : null}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextAccountType">
                  <Form.Label column sm="4">
                    <span className="bold-text">Country:</span>
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control name="country" plaintext readOnly value={values.country} onChange={handleChange} />
                    {errors.country ? <div style={{ color: '#FF0000' }}> {errors.country}</div> : null}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextAccountType">
                  <Form.Label column sm="4">
                    <span className="bold-text">Phone Number:</span>
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control name="phoneNumber" plaintext readOnly value={values.phoneNumber} onChange={handleChange} />
                    {errors.phoneNumber ? <div style={{ color: '#FF0000' }}> {errors.phoneNumber}</div> : null}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextAccountType">
                  <Form.Label column sm="4">
                    <span className="bold-text">Address:</span>
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control name="address" as="textarea" plaintext readOnly value={values.address} onChange={handleChange} />
                    {errors.address ? <div style={{ color: '#FF0000' }}> {errors.address}</div> : null}
                  </Col>
                </Form.Group>

                <Row className="justify-content-center">
                  <Col className="text-center">
                    <Button variant="dark" type="submit" disabled={isSubmitting}>
                      Register
                    </Button>
                  </Col>
                </Row>
              </Form>
            )
          }
        </Formik>
        <br></br>
      </Col>
    </Row>
  );
}
