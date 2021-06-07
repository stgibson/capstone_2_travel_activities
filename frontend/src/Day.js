import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Activity from "./Activity";
import BaseForm from "./BaseForm";
import {
  addActivityToDayInAPI,
  removeActivityFromDayInAPI
} from "./actions/plans";
import "./Day.css";

/**
 * Component for displaying a day in a travel plan
 * @param {Object} param0 
 * @returns JSX code for rendering a day and its activities
 */
const Day = ({ day, planId }) => {
  const [inputChoices, setInputChoices] = useState([]);
  const [inputs, setInputs] = useState([]);
  const token = useSelector(store => store.token);
  const favoriteActivities =
    useSelector(store => store.activities, shallowEqual);
  const dispatch = useDispatch();

  /**
   * If activity with id data.activity isn't already in day, add to day in API
   * and redux store by calling dispatch
   * @param {Object{string}} data 
   */
  const handleAddActivityToPlan = data => {
    const activityId = Number.parseInt(data.activity);
    if (!day.activities.find(activity => activity.id === activityId)) {
      dispatch(addActivityToDayInAPI(
        planId,
        day.number,
        activityId,
        token
      ));
    }
  };

  /**
   * Removes activity with button clicked from day in API and redux store by
   * calling dispatch
   * @param {Object} evt 
   */
  const handleRemoveActivityFromPlan = evt => {
    const { id } = evt.target.parentElement;
    const activityId = Number.parseInt(id);
    dispatch(removeActivityFromDayInAPI(
      planId,
      day.number,
      activityId,
      token
    ));
  };

  // get array of user's favorite activities
  useEffect(() => {
    const favoriteActivitiesArr = Object.keys(favoriteActivities)
      .map(activityId => favoriteActivities[activityId]);
    setInputChoices(favoriteActivitiesArr);
  }, [favoriteActivities, setInputChoices]);

  // generate inputs for form to add activity
  useEffect(() => {
    setInputs([
      {
        name: "activity",
        type: "select",
        choices: inputChoices
      }
    ]);
  }, [inputChoices])

  return (
    <div id={ day.number } className="Day">
      <h3>{ day.number }</h3>
      {
        day.activities.map(activity => (
          <div key={ activity.id }>
            <Activity
              activity={ activity }
              btnText="Remove"
              btnVariant="warning"
              btnCallback={ evt => handleRemoveActivityFromPlan(evt) }
            />
          </div>
        ))
      }
      <BaseForm
        inputs={ inputs }
        btnText="Add Activity"
        submitCallback={ handleAddActivityToPlan }
      />
    </div>
  );
};

export default Day;