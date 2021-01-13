import React from 'react';
import globalStyles from '../../../styles/globalStyles.module.css';
import { AppBar, Button, Menu, MenuItem, Toolbar } from '@material-ui/core';
import { Col, Nav, Navbar, NavDropdown as BootstrapNavDropDown, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import NavDropDown from './NavDropDown';
export default function NavBar() {
  return (
    <Row style={{ backgroundColor: '#000' }}>
      <Col>
        <Navbar expand="lg" variant={'light'} style={{ backgroundColor: '#000000' }} className="text-center">
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ color: '#FFFFFF' }} /> */}
          {/* <Navbar.Collapse id="basic-navbar-nav"> */}
          <Nav className="m-auto" style={{ color: '#FFFFFF' }}>
            <Nav.Link id="basic-nav-dropdown">
              <NavDropDown label="Architecture"></NavDropDown>
            </Nav.Link>
            <Nav.Link id="basic-nav-dropdown">
              <NavDropDown label="Graphics"></NavDropDown>
            </Nav.Link>
            <Nav.Link id="basic-nav-dropdown">
              <NavDropDown label="Interior"></NavDropDown>
            </Nav.Link>
            <Nav.Link id="basic-nav-dropdown">
              <NavDropDown label="Media"></NavDropDown>
            </Nav.Link>
            <Nav.Link id="basic-nav-dropdown">
              <NavDropDown label="Product"></NavDropDown>
            </Nav.Link>
          </Nav>
          {/* </Navbar.Collapse> */}
        </Navbar>
      </Col>
    </Row>
  );
}
