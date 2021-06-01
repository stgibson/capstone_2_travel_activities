import React from "react";
import Container from "react-bootstrap/Container";
import NavBar from "./NavBar";
import Routes from "./Routes";

/**
 * Main component of the app
 * @returns JSX code for rendering app
 */
function App() {
  return (
    <div>
      <NavBar />
      <Container><Routes /></Container>    
    </div>
  );
}

export default App;
