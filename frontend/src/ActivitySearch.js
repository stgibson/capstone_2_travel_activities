import React from "react";
import BaseForm from "./BaseForm";

/**
 * Component for displaying form to search activities by city and country
 * @param {Object} param0 
 * @returns JSX code for rendering activities search form
 */
const ActivitySearch = ({ searchActivities }) => {
  // remove defaults for production
  const inputs = [
    { name: "city", label: "City", type: "text", default: "paris" },
    { name: "country", label: "Country", type: "text", default: "france" }
  ];

  return (
    <BaseForm
      title="Search for Activities"
      inputs={ inputs }
      btnText="Search"
      submitCallback={ searchActivities }
    />
  );
};

export default ActivitySearch;