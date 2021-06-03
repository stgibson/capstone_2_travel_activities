import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import ActivityList from "./ActivityList";

/**
 * Component for displaying list of currently logged in user's favorite
 * activities
 * @returns JSX code for rendering favorite activities page
 */
const FavoriteActivities = () => {
  const [activities, setActivities] = useState([]);
  const activitiesObj = useSelector(store => store.activities, shallowEqual);

  useEffect(() => {
    const activitiesArr =
      Object.keys(activitiesObj).map(id => activitiesObj[id]);
    setActivities(activitiesArr);
  }, [activitiesObj]);

  return (
    <ActivityList title="My Favorite Activities" activities={ activities } />
  );
};

export default FavoriteActivities;