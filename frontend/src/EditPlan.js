import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Day from "./Day";

/**
 * Component for displaying and editing a travel plan
 * @returns JSX code for rendering page of a travel plan
 */
const EditPlan = () => {
  // days should be arr of objects keys number and activities
  const [days, setDays] = useState([]);
  const { id } = useParams();
  const plan = useSelector(store => store.plans[id]);

  // sort days by number, and make activities prop arr
  useEffect(() => {
    const daysFromPlan = [];
    // numbers should be 1 to # of days
    if (plan && plan.days) {
      for (let i = 1; i <= Object.keys(plan.days).length; i++) {
        const day = plan.days[i];
        const activities = Object.keys(day).map(activityId => day[activityId]);
        daysFromPlan.push({ number: i, activities });
      }
      setDays(daysFromPlan);
    }
  }, [plan]);

  return (
    <div>
      <h2>{ plan ? plan.name : "Loading..." }</h2>
      <Row>
        {
          days.map(day => (
            <Col key={ day.number } xs={ 3 }>
              <Day
                day={ day }
                planId={ plan.id }
              />
            </Col>
          ))
        }
      </Row>
    </div>
  );
};

export default EditPlan;