import React, { useState } from "react";
import ActivitySearch from "./ActivitySearch";
import ActivityList from "./ActivityList";

/**
 * Component that allows users to search for activities based on location
 * @param {Object} param0 
 * @returns JSX code for rendering home page
 */
const Home = ({ getActivitiesByLocation }) => {
  const [activities, setActivities] = useState([]);

  const searchActivities = async data => {
    const activitiesResults = await getActivitiesByLocation(data);
    if (activitiesResults) {
      setActivities(activitiesResults);
    }
  };

  return (
    <>
      <div>
        <ActivitySearch searchActivities={ searchActivities } />
      </div>
      <br />
      <div>
        <ActivityList
          title="Results:"
          activities={ activities }
        />
      </div>
    </>
  );
};

export default Home;