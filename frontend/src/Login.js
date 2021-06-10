import React from "react";
import BaseForm from "./BaseForm";
import Footer from "./Footer";

/**
 * Component for displaying form to log in
 * @param {Object} param0 
 * @returns JSX code for rendering login page
 */
const Login = ({ login }) => {
  // remove defaults for production
  const inputs = [
    {
      name: "username",
      label: "Username:",
      type: "text",
      default: ""
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      default: ""
    }
  ]

  return (
    <>
      <BaseForm
        title="Log In"
        inputs={ inputs }
        btnText="Log In"
        submitCallback={ login }
      />
      <Footer />
    </>
  );
};

export default Login;