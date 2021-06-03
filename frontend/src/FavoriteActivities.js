import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Activity from "./Activity";
import { getFavoriteActivitiesFromAPI } from "./actions/activities";

/**
 * Component for displaying list of currently logged in user's favorite
 * activities
 * @returns JSX code for rendering favorite activities page
 */
const FavoriteActivities = () => {
  const activities = useSelector(store => store.activities);

  return (
    <div>
      <h2>My Favorite Activities:</h2>
      {
        Object.keys(activities).map(id => (
          <Activity
            key={ id }
            activity={ activities[id] }
          />
        ))
      }
    </div>
  );
};

export default FavoriteActivities;