import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Component for displaying list of currently logged in user's travel plans
 * @returns JSX code for displaying travel plans list
 */
const PlanList = () => {
  const plans = useSelector(store => store.plans);

  return (
    <>
      {
        Object.keys(plans).map(id => (
          <div id={ id } key={ id }>
            <Link to={ `/plans/${id}` }>{ plans[id].name }</Link>
          </div>
        ))
      }
    </>
  );
};

export default PlanList;