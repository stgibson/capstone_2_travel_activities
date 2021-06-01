import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

/**
 * 
 * @param {*} id 
 * @param {*} token 
 * @returns 
 */
const getDaysInPlanFromAPI = async (id, token) => {
  const res = await axios.get(`${process.env.API_BASE_URL}/plans/${id}`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const { plan } = res.data;
  const days = {};
  const promises = [];
  for (let day of plan.days) {
    const promise = axios.get(`${process.env.API_BASE_URL}/days/${day.id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    promises.push(promise);
  }
  const results = await Promise.all(promises);
  for (let res of results) {
    const { number, activities } = res.data.day;
    const activitiesObj = activities.reduce((obj, activity) => {
      obj[activity.id] = { id: activity.id, name: activity.name };
      return obj;
    }, {});
    days[number] = activitiesObj;
  }
  return days;
};

export { getDaysInPlanFromAPI };