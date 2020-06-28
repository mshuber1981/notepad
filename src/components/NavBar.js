import React from "react";
// https://www.npmjs.com/package/react-router-bootstrap
import { LinkContainer } from "react-router-bootstrap";
// https://react-bootstrap.github.io/components/navbar/
import { Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar
      collapseOnSelect
      bg="primary"
      variant="dark"
      expand="xl"
      fixed="top"
    >
      {/* The Navbar.Brand link WILL refresh the page */}
      <Navbar.Brand href={process.env.PUBLIC_URL + "/"}>Notepad 🗒</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {/* LinkContainer (react-router-bootstrap) links below WILL NOT refresh the page */}
          <LinkContainer exact to="/Notes/">
            <Nav.Link>Sign in</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
