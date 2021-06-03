import React from "react";
import { useSelector, useDispatch } from "react-redux"
import Activity from "./Activity";
import { addFavoriteActivityToAPI } from "./actions/activities";

/**
 * Component for displaying activity results from searching activities
 * @param {Object} param0 
 * @returns JSX code for rendering list of activities
 */
const ActivityResults = ({ activities }) => {
  const token = useSelector(store => store.token);
  const dispatch = useDispatch();

  /**
   * Calls dispatch to add activity to list of currently logged in user's
   * favorite activities
   * @param {Object} evt 
   */
  const handleLike = evt => {
    const { id } = evt.target.parentElement;
    dispatch(addFavoriteActivityToAPI(id, token));
  };

  return (
    <div>
      <h2>Results:</h2>
      {
        activities.map(activity => (
          <Activity
            key={ activity.id }
            activity={ activity }
            btnText="Like"
            btnCallback={ evt => handleLike(evt) }
          />
        ))
      }
    </div>
  );
};

export default ActivityResults;