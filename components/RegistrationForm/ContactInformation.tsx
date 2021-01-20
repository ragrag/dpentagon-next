import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { CountryDropdown } from 'react-country-region-selector';
import { RegisterUserDTO } from '../../lib/requests/mutators/userRegister';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

type Props = {
  registrationData: RegisterUserDTO;
  setRegistrationData: React.Dispatch<React.SetStateAction<RegisterUserDTO>>;
};

export default function ContactInformation({ registrationData, setRegistrationData }: Props) {
  return (
    <Form
      noValidate
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <Form.Group as={Row} className="justify-content-center" controlId="formPlaintextEmail">
        <Col className="text-left" sm="6">
          <h4 className="text-center">Contact information</h4>

          <br></br>
          <Form.Group as={Row} controlId="formPlaintextDisplayName">
            <Form.Label column sm="4">
              <span className="bold-text">Phone Number:</span>
            </Form.Label>
            <Col sm="6">
              <PhoneInput
                value={registrationData.phoneNumber}
                country="us"
                onChange={phone => {
                  setRegistrationData({ ...registrationData, phoneNumber: '+' + phone });
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="4">
              <span className="bold-text">Address:</span>
            </Form.Label>
            <Col sm="6">
              <Form.Control
                name="address"
                as="textarea"
                style={{
                  backgroundColor: '#FFFFFF',
                }}
                plaintext
                value={registrationData.address}
                onChange={e => {
                  setRegistrationData({ ...registrationData, address: e.target.value });
                }}
              />
              {registrationData.userType === 'freelancer' ? (
                <h6 className="text-center" style={{ marginTop: '10px', fontSize: 12, color: '#FF0000' }}>
                  you can fill address information later
                </h6>
              ) : null}
            </Col>
          </Form.Group>
        </Col>
      </Form.Group>
    </Form>
  );
}
