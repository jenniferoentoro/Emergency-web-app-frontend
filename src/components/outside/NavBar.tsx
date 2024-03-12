// src/components/NavBar.tsx
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar: React.FC = () => {
  return (
    <Navbar className='mx-8 playfair-font' expand="lg">
      
      {/* navbar brand with image */}
      <Navbar.Brand href="/">
      <img
  src="/images/logo.png"
  className="d-inline-block align-top w-36 sm:w-44 md:w-52"
  alt="Logo"
/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto text-xl">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/services">Services</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
          <Nav.Link href="/login">Sign In | Sign Up</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
