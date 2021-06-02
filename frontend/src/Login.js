import React from "react";
import BaseForm from "./BaseForm";

/**
 * Component for displaying form to log in
 * @param {Object} param0 
 * @returns JSX code for rendering login page
 */
const Login = ({ login }) => {
  const inputs = [
    { name: "username", label: "Username:", type: "text", default: "" },
    { name: "password", label: "Password", type: "password", default: "" }
  ]

  return (
    <BaseForm inputs={ inputs } btnText="Log In" submitCallback={ login } />
  );
};

export default Login;