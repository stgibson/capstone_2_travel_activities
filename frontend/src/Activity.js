import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Activity = ({ activity, btnText, btnCallback }) => {
  return (
    <div id={ activity.id }>
      <Link to={ `/activities/${activity.id}` }>{ activity.name }</Link>
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