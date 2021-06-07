import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BaseForm from "./BaseForm";
import { addPlanToAPI } from "./actions/plans";

/**
 * Component for displaying form to create a new travel plan
 * @returns JSX code for rendering create a travel plan form
 */
const NewPlan = () => {
  const history = useHistory();
  const token = useSelector(store => store.token);
  const dispatch = useDispatch();

  const inputs = [
    { name: "name", label: "Travel plan name:", type: "text", default: "" },
    {
      name: "numOfDays",
      label: "Number of days in travel plan:", type: "text", default: "" }
  ];

  /**
   * Handles creating plan by calling dispatch to add plan to db and redux
   * store
   * @param {Object{string}} data 
   */
  const handleCreatePlan = data => {
    const { name, numOfDays } = data;
    history.push("/plans");
    dispatch(addPlanToAPI(
      { name, numOfDays: Number.parseInt(numOfDays) },
      token
    ));
  };

  return (
    <BaseForm
      title="Create a New Travel Plan"
      inputs={ inputs }
      btnText="Create Plan"
      submitCallback={ handleCreatePlan }
    />);
};

export default NewPlan;