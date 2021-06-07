import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Activity.css";

/**
 * Component for displaying an activity link with button
 * @param {Object} param0 
 * @returns JSX code for rendering an activity
 */
const Activity = ({ activity, btnText, btnCallback }) => {
  return (
    <div id={ activity.id }>
      <Link className="Activity-link" to={ `/activities/${activity.id}` }>
        { activity.name }
      </Link>
      {
        btnText && (
          <Button variant="primary" onClick={ btnCallback }>
            { btnText }
          </Button>
        )
      }
    </div>
  );
};

export default Activity;