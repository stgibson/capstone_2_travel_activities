import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Activity from "./Activity";
import {
  addFavoriteActivityToAPI,
  removeFavoriteActivityFromAPI
} from "./actions/activities";

/**
 * Component for displaying activity results from searching activities
 * @param {Object} param0 
 * @returns JSX code for rendering list of activities
 */
const ActivityList = ({ title, activities }) => {
  const token = useSelector(store => store.token);
  const likedActivities = useSelector(store => store.activities, shallowEqual);
  const dispatch = useDispatch();

  /**
   * Calls dispatch to add activity to list of currently logged in user's
   * favorite activities
   * @param {Object} evt 
   */
  const handleLike = evt => {
    const { id } = evt.target.parentElement;
    dispatch(addFavoriteActivityToAPI(Number.parseInt(id), token));
  };

  /**
   * Calls dispatch to remove activity from list of currently logged in user's
   * favorite activities
   * @param {Object} evt 
   */
  const handleUnlike = evt => {
    const { id } = evt.target.parentElement;
    dispatch(removeFavoriteActivityFromAPI(Number.parseInt(id), token));
  }

  /**
   * Determines if currently logged in user likes activity with provided id
   * @param {number} id 
   * @returns true if user likes activity, false otherwise
   */
  const liked = id => {
    if (likedActivities[id]) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <h2>{ title }</h2>
      {
        activities.map(activity => (
          liked(activity.id) ? (
            <Activity
              key={ activity.id }
              activity={ activity }
              btnText="Unlike"
              btnCallback={ evt => handleUnlike(evt) }
            />
          ) : (
            <Activity
              key={ activity.id }
              activity={ activity }
              btnText="Like"
              btnCallback={ evt => handleLike(evt) }
            />
          )
        ))
      }
    </div>
  );
};

export default ActivityList;