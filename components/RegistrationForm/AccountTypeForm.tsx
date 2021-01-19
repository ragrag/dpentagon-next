import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Profession from '../../lib/interfaces/profession';
import { RegisterUserDTO } from '../../lib/requests/mutators/userRegister';

type Props = {
  registrationData: RegisterUserDTO;
  setRegistrationData: React.Dispatch<React.SetStateAction<RegisterUserDTO>>;
  professions: Profession[];
};

export default function AccountTypeForm({ registrationData, setRegistrationData, professions }: Props) {
  return (
    <>
      <br></br>
      <h4>Account Information</h4>
      <br></br>
      <Form
        noValidate
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <Form.Group as={Row} className="justify-content-center" controlId="formPlaintextUserType">
          <Form.Label className="text-left" column sm="2" xs="4">
            Account type
          </Form.Label>
          <Col className="text-center" sm="2">
            <Form.Check
              type="radio"
              name="userType"
              label={'Freelancer'}
              checked={registrationData.userType === 'freelancer'}
              value="freelancer"
              onChange={e => {
                setRegistrationData({ ...registrationData, userType: e.target.value });
              }}
            />

            {/* {errors.displayName ? <div style={{ color: '#FF0000' }}> {errors.displayName}</div> : null} */}
          </Col>
          <Col className="text-center" sm="2" xs="4">
            <Form.Check
              type="radio"
              name="userType"
              label={'Company'}
              checked={registrationData.userType === 'company'}
              value="company"
              onChange={e => {
                setRegistrationData({ ...registrationData, userType: e.target.value });
              }}
            />
          </Col>
        </Form.Group>

        <Form>
          <Form.Group as={Row} className="justify-content-center" controlId="formPlaintextProfession">
            <Form.Label className="text-left" column sm="2">
              Profession
            </Form.Label>
            <Col sm="4">
              <Form.Control
                as="select"
                custom
                value={registrationData.professionId}
                onChange={e => {
                  console.log(e.target.value);
                  setRegistrationData({ ...registrationData, professionId: Number(e.target.value) });
                }}
              >
                {professions.map(profession => {
                  return (
                    <option key={profession.id} value={profession.id}>
                      {profession.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
      </Form>
    </>
  );
}
