import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const navbar =()=> {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
        
      <Container>
        <Navbar.Brand href="#home">Bus Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <div className='ml-auto'>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto ">
          <NavDropdown title="Services" id="basic-nav-dropdown">
              <NavDropdown.Item href="/admin">Admin</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#link">Contact</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
        </div>
        
      </Container>
    </Navbar>
  );
}

export default navbar;