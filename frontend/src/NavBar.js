import React from "react";
import { useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

/**
 * Component for navigation bar
 * @returns JSX code for rendering navigation bar
 */
const NavBar = () => {
  const username = useSelector(store => store.username);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Travel Activities</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {
          username ? (
            <Nav className="mr-auto">
              <Nav.Link href="/favorite-activities">
                My Favorite Activities
              </Nav.Link>
              <Nav.Link href="/create-plan">Create a New Plan</Nav.Link>
              <Nav.Link href="/plans">My Plans</Nav.Link>
              <Nav.Link href="/">Logout</Nav.Link>
            </Nav>
          ) : (
            <Nav className="mr-auto">
              <Nav.Link href="/signup">Sign Up</Nav.Link>
              <Nav.Link href="/login">Log In</Nav.Link>
            </Nav>
          )
        }
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;