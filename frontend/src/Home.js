import React, { useState } from "react";
import ActivitySearch from "./ActivitySearch";
import ActivityResults from "./ActivityResults";

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