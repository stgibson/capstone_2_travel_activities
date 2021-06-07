import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { v4 as uuid } from "uuid";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import NavBar from "./NavBar";
import Routes from "./Routes";
import Footer from "./Footer";
import { setToken, removeToken } from "./actions/token";
import { getFavoriteActivitiesFromAPI } from "./actions/activities";
import { getPlansFromAPI } from "./actions/plans";

/**
 * Main component of the app
 * @returns JSX code for rendering app
 */
function App() {
  const [currToken, setCurrToken] = useState(null);
  const [errorsToDisplay, setErrorsToDisplay] = useState([]);
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  /**
   * Creates new user based on data and stores token if no errors
   * @param {Object{string}} data 
   */
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
      setErrorsToDisplay([]);
    }
    catch (err) {
      const msg =
        "Invalid input or username has been taken. Please try again.";
      setErrorsToDisplay([msg]);
    }
  };

  /**
   * Authenticates user with data and stores token if no errors
   * @param {Object{string}} data 
   */
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
      setErrorsToDisplay([]);
    }
    catch (err) {
      const msg = "Invalid credentials. Please try again.";
      setErrorsToDisplay([msg]);
    }
  };

  /**
   * Removes token from local storage and redux store
   */
  const logout = () => {
    localStorage.removeItem("token");
    dispatch(removeToken());
  };

  /**
   * Gets list of activities from db based on data
   * @param {Object{string}} data 
   * @returns activities or null if error
   */
  const getActivitiesByLocation = async data => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/activities`,
        {
          params: data,
          headers: { "Authorization": `Bearer ${currToken}` }
        }
      );
      setErrorsToDisplay([]);
      return res.data.activities;
    }
    catch (err) {
      const msg =
        "Couldn't find activities at provided input. Please try another location.";
      setErrorsToDisplay([msg]);
      return null;
    }
  };

  /**
   * Gets all info from db for activity with provided id
   * @param {number} id 
   * @returns activity details or null if error
   */
  const getActivityDetails = async id => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/activities/${id}`,
        {
          headers: { "Authorization": `Bearer ${currToken}` }
        }
      );
      setErrorsToDisplay([]);
      return res.data.activity;
    }
    catch (err) {
      const msg = "Couldn't find info on this activity";
      setErrorsToDisplay([msg]);
      return null;
    }
  };

  // when first renders, get token from local storage if it exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
      setCurrToken(token);
    }
  }, [dispatch]);

  // if user signs in, get the user's favorite activities and plans
  useEffect(() => {
    if (currToken) {
      dispatch(getFavoriteActivitiesFromAPI(currToken));
      dispatch(getPlansFromAPI(currToken));
    }
  }, [dispatch, currToken]);

  useEffect(() => {
    if (errors) {
      setErrorsToDisplay(errors);
    }
    else {
      setErrorsToDisplay([]);
    }
  }, [errors, setErrorsToDisplay]);

  return (
    <div>
      <NavBar logout={ logout } />
      <Container>
        {
          errorsToDisplay.map(err => (
            <Alert key={ uuid() } variant="danger">{ err }</Alert>
          ))
        }
        <Routes
          signup={ signup }
          login={ login }
          getActivitiesByLocation={ getActivitiesByLocation }
          getActivityDetails={ getActivityDetails }
        />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
