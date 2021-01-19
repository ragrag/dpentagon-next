import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { CountryDropdown } from 'react-country-region-selector';
import { RegisterUserDTO } from '../../lib/requests/mutators/userRegister';

type Props = {
  registrationData: RegisterUserDTO;
  setRegistrationData: React.Dispatch<React.SetStateAction<RegisterUserDTO>>;
};

export default function EmailPasswordForm({ registrationData, setRegistrationData }: Props) {
  return (
    <Form
      noValidate
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <Form.Group as={Row} className="justify-content-center" controlId="formPlaintextEmail">
        <Col className="text-left" sm="6">
          <h4 className="text-center">Login information</h4>
          <br></br>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="4">
              <span className="bold-text">Email:</span>
            </Form.Label>
            <Col sm="6">
              <Form.Control
                name="email"
                style={{
                  backgroundColor: '#FFFFFF',
                }}
                plaintext
                value={registrationData.email}
                onChange={e => {
                  setRegistrationData({ ...registrationData, email: e.target.value });
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="4">
              <span className="bold-text">Password:</span>
            </Form.Label>
            <Col sm="6">
              <Form.Control
                name="password"
                style={{
                  backgroundColor: '#FFFFFF',
                }}
                plaintext
                type="password"
                value={registrationData.password}
                onChange={e => {
                  setRegistrationData({ ...registrationData, password: e.target.value });
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Form.Group>
    </Form>
  );
}
