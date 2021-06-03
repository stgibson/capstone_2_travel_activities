import React, { useState } from "react";
import ActivitySearch from "./ActivitySearch";
import ActivityResults from "./ActivityResults";

/**
 * Component that allows users to search for activities based on location
 * @param {Object} param0 
 * @returns JSX code for rendering home page
 */
const Home = ({ getActivitiesByLocation, getActivityDetails }) => {
  const [activities, setActivities] = useState([]);

  const searchActivities = async data => {
    const activitiesResults = await getActivitiesByLocation(data);
    if (activitiesResults) {
      setActivities(activitiesResults);
    }
  };

  return (
    <>
      <ActivitySearch searchActivities={ searchActivities } />
      <ActivityResults
        activities={ activities }
        getActivityDetails={ getActivityDetails }
      />
    </>
  );
};

export default Home;