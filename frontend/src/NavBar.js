import React from "react";
import { useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

/**
 * Component for navigation bar
 * @param {Object} param0 
 * @returns JSX code for rendering navigation bar
 */
const NavBar = ({ logout }) => {
  const token = useSelector(store => store.token);

  return (
    <Navbar bg="light" varian="light">
      <Navbar.Brand href="/">Travel Activities</Navbar.Brand>
      {
        token ? (
          <Nav className="ml-auto">
            <Nav.Link href="/activities">
              My Favorite Activities
            </Nav.Link>
            <Nav.Link href="/plans/add">Create a New Plan</Nav.Link>
            <Nav.Link href="/plans">My Plans</Nav.Link>
            <Nav.Link href="/" onClick={ logout }>Logout</Nav.Link>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Nav.Link href="/signup">Sign Up</Nav.Link>
            <Nav.Link href="/login">Log In</Nav.Link>
          </Nav>
        )
      }
    </Navbar>
  );
};

export default NavBar;