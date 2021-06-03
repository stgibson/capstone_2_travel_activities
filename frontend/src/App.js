import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { v4 as uuid } from "uuid";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import NavBar from "./NavBar";
import Routes from "./Routes";
import { setToken, removeToken } from "./actions/token";

/**
 * Main component of the app
 * @returns JSX code for rendering app
 */
function App() {
  const [currToken, setCurrToken] = useState(null);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const signup = async data => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/register`,
        data
      );
      const token = res.data.token;
      localStorage.setItem("token", token);
      dispatch(setToken(token));
      setCurrToken(token);
      history.push("/home");
    }
    catch (err) {
      console.error(err.message);
    }
  };

  const login = async data => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        data
      );
      const token = res.data.token;
      localStorage.setItem("token", token);
      dispatch(setToken(token));
      setCurrToken(token);
      history.push("/home");
    }
    catch (err) {
      console.error(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(removeToken());
  };

  const getActivitiesByLocation = async data => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/activities`,
        {
          params: data,
          headers: { "Authorization": `Bearer ${currToken}` }
        }
      );
      return res.data.activities;
    }
    catch (err) {
      setErrors(errors => [err.message]);
      return null;
    }
  };

  const getActivityDetails = async id => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/activities/${id}`,
        {
          headers: { "Authorization": `Bearer ${currToken}` }
        }
      );
      return res.data.activity;
    }
    catch (err) {
      setErrors(errors => [...errors, err.message]);
      return null;
    }
  };

  useEffect(() => {
    setErrors([]);
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
      setCurrToken(token);
    }
  }, [dispatch]);

  return (
    <div>
      <NavBar logout={ logout } />
      <Container>
        {
          errors.map(err => (
            <Alert key={ uuid() } variant="danger">{ err }</Alert>
          ))
        }
        <Routes
          signup={ signup }
          login={ login }
          getActivitiesByLocation={ getActivitiesByLocation }
          getActivityDetails={ getActivityDetails }
        />
      </Container> 
    </div>
  );
}

export default App;
