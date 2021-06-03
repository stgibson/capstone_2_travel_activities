import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ActivityDetails = ({ getActivityDetails }) => {
  const { id } = useParams();
  const [currActivity, setCurrActivity] = useState(null);

  useEffect(() => {
    const getActivity = async () => {
      const activity = await getActivityDetails(id);
      if (activity) {
        setCurrActivity(activity);
      }
    };
    getActivity();
  }, [id, getActivityDetails])

  return (
    <>
    {
      currActivity ? (
        <>
          <h1>{ currActivity.name }</h1>
          <div>{ currActivity.description }</div>
          <div>Rating: { currActivity.rating }</div>
          <div>Booking Link: { currActivity.bookingLink }</div>
          <div>Price: { currActivity.price }</div>
          <div>Currency: { currActivity.currencyCode }</div>
        </>
      ) : (
        <h1>...Loading</h1>
      )
    }
    </>
  );
};

export default ActivityDetails;