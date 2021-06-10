import React from "react";
import BaseForm from "./BaseForm";
import Footer from "./Footer";

/**
 * Component for displaying form to create an account
 * @param {Object} param0 
 * @returns JSX code for rendering signup page
 */
const Signup = ({ signup }) => {
  const inputs = [
    { name: "username", label: "Username:", type: "text", default: "" },
    { name: "password", label: "Password", type: "password", default: "" }
  ]

  return (
    <>
      <BaseForm
        title="Sign Up"
        inputs={ inputs }
        btnText="Sign Up"
        submitCallback={ signup }
      />
      <Footer />
    </>
  );
};

export default Signup;