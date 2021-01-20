import React from 'react';
import { Col, Nav, Navbar, Row } from 'react-bootstrap';
import NavDropDown from './NavDropDown';
export default function NavBar() {
  return (
    <>
      <Row style={{ backgroundColor: '#000', height: '45px' }} className="justify-content-md-center">
        <Col xs="12" sm="12" md="6" className="text-center my-auto">
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', alignContent: 'center' }}>
            <NavDropDown professions={['architecture']} label="Architecture"></NavDropDown>
            <NavDropDown professions={['graphic']} label="Graphic"></NavDropDown>
            <NavDropDown professions={['interior']} label="Interior"></NavDropDown>
            <NavDropDown professions={['media']} label="Media"></NavDropDown>
            <NavDropDown professions={['product']} label="Product"></NavDropDown>
          </div>
        </Col>
      </Row>
      <style jsx>{``}</style>
    </>
  );
}
