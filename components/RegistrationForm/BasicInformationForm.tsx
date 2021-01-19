import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { CountryDropdown } from 'react-country-region-selector';
import { RegisterUserDTO } from '../../lib/requests/mutators/userRegister';

type Props = {
  registrationData: RegisterUserDTO;
  setRegistrationData: React.Dispatch<React.SetStateAction<RegisterUserDTO>>;
};

export default function BasicInformationForm({ registrationData, setRegistrationData }: Props) {
  return (
    <Form
      noValidate
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <Form.Group as={Row} className="justify-content-center" controlId="formPlaintextEmail">
        <Col className="text-left" sm="6">
          <h4 className="text-center">Basic information</h4>
          <br></br>
          <Form.Group as={Row} controlId="formPlaintextDisplayName">
            <Form.Label column sm="4">
              <span className="bold-text">{registrationData.userType === 'freelancer' ? '' : 'Company'} Name:</span>
            </Form.Label>
            <Col sm="6">
              <Form.Control
                name="displayName"
                style={{
                  backgroundColor: '#FFFFFF',
                }}
                plaintext
                value={registrationData.displayName}
                onChange={e => {
                  setRegistrationData({ ...registrationData, displayName: e.target.value });
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="4">
              <span className="bold-text">Country:</span>
            </Form.Label>
            <Col sm="6">
              <CountryDropdown
                value={registrationData.country}
                onChange={val => {
                  setRegistrationData({ ...registrationData, country: val });
                }}
                name="country"
              />
            </Col>
          </Form.Group>
        </Col>
      </Form.Group>
    </Form>
  );
}
