import React from "react";
import Navbar from "react-bootstrap/Navbar";

/**
 * Component for displaying acknowledgements for the website. Uses Navbar to
 * make footer stick to bottom.
 * @returns JSX code for rendering footer
 */
const Footer = () => {
  return (
    <Navbar bg="light" fixed="bottom">
      <small>
        The information on travel activities in this website is provided by the
        Tours and Activities API by Amadeus for Developers located at
        https://developers.amadeus.com/self-service/category/destination-content/api-doc/tours-and-activities/api-reference.
        Furthermore, this site also uses the Geocoding API located at
        https://developers.google.com/maps/documentation/geocoding/overview
      </small>
    </Navbar>    
  );
};

export default Footer;