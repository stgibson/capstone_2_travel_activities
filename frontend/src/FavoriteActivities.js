import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Activity from "./Activity";
import { getFavoriteActivitiesFromAPI } from "./actions/activities";

const FavoriteActivities = () => {
  const activities = useSelector(store => store.activities);
  const token = useSelector(store => store.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getFavoriteActivitiesFromAPI(token));
    }
  }, [dispatch, token]);

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