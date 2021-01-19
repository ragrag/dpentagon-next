import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { mutateCallback } from 'swr/dist/types';
import User from '../../lib/interfaces/user';
import { CountryDropdown } from 'react-country-region-selector';
import * as Yup from 'yup';
import 'yup-phone';
import { Formik } from 'formik';
import updateUserRequest from '../../lib/requests/mutators/updateUser';
import PhoneInput from 'react-phone-input-2';
type Props = {
  visible: boolean;
  setModalVisibility: (visible: boolean) => void;
  user: User;
  readOnly: boolean;
  mutateUser?: (data?: User | Promise<User> | mutateCallback<User>, shouldRevalidate?: boolean) => Promise<User>;
};

const ContactInfoSchema = Yup.object().shape({
  displayName: Yup.string().min(2).required('Display name is required'),
  profileInfo: Yup.string().nullable(),
  country: Yup.string().required('Country is required'),
  phoneNumber: Yup.string().phone('Phone number must be valid'),
  address: Yup.string().nullable(),
});

export default function UserContactInfo({ visible, setModalVisibility, user, readOnly, mutateUser }: Props) {
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
    <Modal
      onHide={() => {
        setModalVisibility(false);
      }}
      show={visible}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: '#EEEEEE' }}>
        <Modal.Title id="contained-modal-title-vcenter">Contact Info</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#EEEEEE', maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
        <Formik
          initialValues={{
            displayName: user?.displayName ?? '',
            profileInfo: user?.profileInfo ?? '',
            country: user?.country ?? '',
            phoneNumber: user?.phoneNumber ?? '',
            address: user?.address ?? '',
          }}
          validationSchema={ContactInfoSchema}
          onSubmit={async values => {
            // same shape as initial values
            try {
              clearErrors();
              const response = await updateUserRequest({
                //   address: values.address,
                //   country: values.country,
                //   displayName: values.displayName,
                //   phoneNumber: values.phoneNumber,
                //   profileInfo: values.profileInfo,
                ...values,
                professionId: user.profession.id,
                email: user.email,
              });
              mutateUser(
                {
                  ...user,
                  ...values,
                },
                true,
              );
            } catch (err) {
              alert('Something went wrong, please try again later');
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
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="3">
                  <span className="bold-text">{user.userType === 'freelancer' ? '' : 'Company'} Name:</span>
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    style={{
                      backgroundColor: readOnly ? '' : '#FFF',
                    }}
                    name="displayName"
                    plaintext
                    readOnly={readOnly}
                    value={values.displayName}
                    onChange={handleChange}
                  />
                  {errors.displayName ? <div style={{ color: '#FF0000' }}> {errors.displayName}</div> : null}
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="3">
                  <span className="bold-text">Profile Info:</span>
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    as="textarea"
                    style={{
                      backgroundColor: readOnly ? '' : '#FFF',
                    }}
                    name="profileInfo"
                    plaintext
                    readOnly={readOnly}
                    value={values.profileInfo}
                    onChange={handleChange}
                  />
                  {errors.profileInfo ? <div style={{ color: '#FF0000' }}> {errors.profileInfo}</div> : null}
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="3">
                  <span className="bold-text"> Profession:</span>
                </Form.Label>
                <Col sm="6">
                  <Form.Control plaintext readOnly value={user?.profession?.name} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="3">
                  <span className="bold-text">Email:</span>
                </Form.Label>
                <Col sm="6">
                  <Form.Control plaintext readOnly value={user.email} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="3">
                  <span className="bold-text">Country:</span>
                </Form.Label>
                <Col sm="6">
                  {readOnly ? (
                    <Form.Control name="country" plaintext readOnly={readOnly} value={values.country} onChange={handleChange} />
                  ) : (
                    <CountryDropdown
                      value={values.country}
                      onChange={(_, e) => {
                        handleChange(e);
                      }}
                      name="country"
                      disabled={readOnly}
                    />
                  )}
                </Col>
                {errors.country ? <div style={{ color: '#FF0000' }}> {errors.country}</div> : null}
              </Form.Group>
              {/* <Form.Group as={Row} controlId="formPlaintextDisplayName">
                <Form.Label column sm="3">
                  <span className="bold-text">Phone Number:</span>
                </Form.Label>
                <Col sm="6">
                  <PhoneInput
                    disabled={readOnly}
                    name="phoneNumber"
                    value={values.phoneNumber}
                    country="us"
                    onChange={(value, country, e, formattedValue) => {
                      e.target.value = '+' + e.target.value;
                      handleChange(e);
                    }}
                  />
                </Col>
              </Form.Group> */}
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="3">
                  <span className="bold-text">Phone Number:</span>
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    style={{
                      backgroundColor: readOnly ? '' : '#FFF',
                    }}
                    name="phoneNumber"
                    plaintext
                    readOnly={readOnly}
                    value={values.phoneNumber}
                    onChange={handleChange}
                  />
                  {errors.phoneNumber ? <div style={{ color: '#FF0000' }}> {errors.phoneNumber}</div> : null}
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="3">
                  <span className="bold-text">Address:</span>
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    style={{
                      backgroundColor: readOnly ? '' : '#FFF',
                    }}
                    as="textarea"
                    name="address"
                    plaintext
                    readOnly={readOnly}
                    value={values.address}
                    onChange={handleChange}
                  />
                  {errors.address ? <div style={{ color: '#FF0000' }}> {errors.address}</div> : null}
                </Col>
              </Form.Group>
              {readOnly ? null : (
                <Row className="justify-content-center">
                  <Col className="text-center">
                    <Button variant="dark" type="submit" disabled={isSubmitting}>
                      Update Info
                    </Button>
                  </Col>
                </Row>
              )}
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}
