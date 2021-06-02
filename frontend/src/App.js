import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Container from "react-bootstrap/Container";
import NavBar from "./NavBar";
import Routes from "./Routes";
import { setToken, removeToken } from "./actions/token";

/**
 * Main component of the app
 * @returns JSX code for rendering app
 */
function App() {
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

  const searchActivities = data => {
    console.log("searchActivities() called");
    console.dir(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
  });

  return (
    <div>
      <NavBar logout={ logout } />
      <Container>
        <Routes
          signup={ signup }
          login={ login }
          searchActivities={ searchActivities }
        />
      </Container> 
    </div>
  );
}

export default App;
