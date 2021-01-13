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
            <Nav className="m-auto" style={{ color: '#FFFFFF' }}>
              <Nav.Link id="basic-nav-dropdown" style={{ marginRight: '25px' }}>
                <NavDropDown label="Architecture"></NavDropDown>
              </Nav.Link>
              <Nav.Link id="basic-nav-dropdown" style={{ marginRight: '25px' }}>
                <NavDropDown label="Graphics"></NavDropDown>
              </Nav.Link>
              <Nav.Link id="basic-nav-dropdown" style={{ marginRight: '25px' }}>
                <NavDropDown label="Interior"></NavDropDown>
              </Nav.Link>
              <Nav.Link id="basic-nav-dropdown" style={{ marginRight: '25px' }}>
                <NavDropDown label="Media"></NavDropDown>
              </Nav.Link>
              <Nav.Link id="basic-nav-dropdown" style={{ marginRight: '25px' }}>
                <NavDropDown label="Product"></NavDropDown>
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
