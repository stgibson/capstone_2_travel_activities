import React from "react";
import { useSelector, useDispatch } from "react-redux"
import Activity from "./Activity";
import { addFavoriteActivityToAPI } from "./actions/activities";

const ActivityResults = ({ activities }) => {
  const token = useSelector(store => store.token);
  const dispatch = useDispatch();

  const handleLike = evt => {
    const { id } = evt.target.parentElement;
    console.log(token);
    dispatch(addFavoriteActivityToAPI(id, token));
  };

  return (
    <div>
      <h2>Results:</h2>
      {
        activities.map(activity => (
          <Activity
            key={ activity.id }
            activity={ activity }
            btnText="Like"
            btnCallback={ evt => handleLike(evt) }
          />
        ))
      }
    </div>
  );
};

export default ActivityResults;