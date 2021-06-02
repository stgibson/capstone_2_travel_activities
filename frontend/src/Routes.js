import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import FavoriteActivities from "./FavoriteActivities";
import ActivityDetails from "./ActivityDetails";
import NewPlan from "./NewPlan";
import PlanList from "./PlanList";
import EditPlan from "./EditPlan";

/**
 * Component for setting up routing
 * @param {Object} param0 
 * @returns JSX code for rendering components based on url path
 */
const Routes = ({ signup, login, searchActivities }) => {
  const token = useSelector(store => store.token);

  return (
    <>
      {
        token ? (
          <Switch>
            <Route exact path="/home">
              <Home searchActivities={ searchActivities } />
            </Route>
            <Route exact path="/activities/like"><FavoriteActivities /></Route>
            <Route exact path="/activities/:id"><ActivityDetails /></Route>
            <Route exact path="/plans/add"><NewPlan /></Route>
            <Route exact path="/plans"><PlanList /></Route>
            <Route exact path="/plans/:id"><EditPlan /></Route>
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/signup"><Signup signup={ signup } /></Route>
            <Route exact path="/login"><Login login={ login } /></Route>
            <Redirect to="/login" />
          </Switch>
        )
      }
    </>
  );
};

export default Routes;