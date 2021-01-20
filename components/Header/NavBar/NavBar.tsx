import React from 'react';
import { Col, Nav, Navbar, Row } from 'react-bootstrap';
import NavDropDown from './NavDropDown';
export default function NavBar() {
  return (
    <>
      <Row style={{ backgroundColor: '#000' }}>
        <Col>
          <Navbar expand="lg" variant={'light'} style={{ backgroundColor: '#000000' }} className="text-center">
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ color: '#FFFFFF' }} /> */}
            {/* <Navbar.Collapse id="basic-navbar-nav"> */}
            <Nav className="m-auto  navbar-icons d-flex flex-row" style={{ color: '#FFFFFF' }}>
              <Nav.Link id="basic-nav-dropdown" style={{ marginRight: '25px' }}>
                <NavDropDown professions={['architecture']} label="Architecture"></NavDropDown>
              </Nav.Link>
              <Nav.Link id="basic-nav-dropdown" style={{ marginRight: '25px' }}>
                <NavDropDown professions={['graphic']} label="Graphic"></NavDropDown>
              </Nav.Link>
              <Nav.Link id="basic-nav-dropdown" style={{ marginRight: '25px' }}>
                <NavDropDown professions={['interior']} label="Interior"></NavDropDown>
              </Nav.Link>
              <Nav.Link id="basic-nav-dropdown" style={{ marginRight: '25px' }}>
                <NavDropDown professions={['media']} label="Media"></NavDropDown>
              </Nav.Link>
              <Nav.Link id="basic-nav-dropdown" style={{ marginRight: '25px' }}>
                <NavDropDown professions={['product']} label="Product"></NavDropDown>
              </Nav.Link>
            </Nav>
            {/* </Navbar.Collapse> */}
          </Navbar>
        </Col>
      </Row>
      <style jsx>{``}</style>
    </>
  );
}
