import React from "react";
import BaseForm from "./BaseForm";

const ActivitySearch = ({ searchActivities }) => {
  const inputs = [
    { name: "city", label: "City", type: "text", default: "" },
    { name: "country", label: "Country", type: "text", default: "" }
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