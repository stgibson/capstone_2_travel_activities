const axios = require("axios");
require("dotenv").config();
const { City, Country, Activity } = require("./models");

const seed = async () => {
  try {
    // create test user
    const user = { username: "testuser", password: "testing" };
    await axios.post(`${process.env.API_BASE_URL}/auth/register`, user);

    // create test city and country
    const country = await Country.create({ name: "france" });
    const city = await City.create({ name: "paris", countryId: country.id });

    // create test activities
    const activities = [
      {
        name: "Skip the Line: Eiffel Tower Tour and Summit Access by elevator",
        description: "Skip the notorious long lines at the Eiffel Tower and discover Paris' most famous landmark with a local and passionate guide during this engaging 90-minute tour. Your ticket includes skip-the-line access to the second level of the Eiffel Tower as well as access to the tower's summit, where you can enjoy a view of Paris' skyline from 1,063 feet above the city.",
        rating: "4.500000",
        bookingLink: "https://b2c.mla.cloud/c/n5oBPT0G?c=2WxbgL36",
        price: "69.00",
        currencyCode: "EUR",
        cityId: city.id
      },
      {
        name: "Paris in One Day : Eiﬀel Tower Summit, Louvre, Notre-Dame, Seine River Cruise",
        description: "The best of Paris in 1 day. Enjoy a fully guided tour of Paris including Eiffel Tower summit by lift, the Louvre museum, a Seine river cruise, a walking tour of île de la cité, Notre-Dame Cathedral (from the outside) and a visit of one Paris oldest church, Saint-Germain-l'Auxerrois.",
        rating: "4.600000",
        bookingLink: "https://b2c.mla.cloud/c/6JZTMdtn?c=2WxbgL36",
        price: "185.00",
        currencyCode: "EUR",
        cityId: city.id
      },
      {
        name: "Eiffel Tower Priority Access Ticket with Host",
        description: "Save your precious Paris sightseeing time with this skip-the-line Eiffel Tower ticket. One of only a few priority admission tickets to include a live guide and commentary, this 1-hour experience ensures a hassle-free visit to one of the world’s busiest monuments. Choose a start time when you book, then walk with your host to the second level, enjoying a relaxing entrance to the Eiffel Tower plus ample free time. Wander the viewing levels, and gaze out at Notre Dame Cathedral, Les Invalides, and more — all from up high.",
        rating: "4.000000",
        bookingLink: "https://b2c.mla.cloud/c/OKO6uEjj?c=2WxbgL36",
        price: "36.00",
        currencyCode: "EUR",
        cityId: city.id
      }
    ];
    const promises = [];
    activities.forEach(activity => {
      const { name, description, rating, bookingLink, price, currencyCode } = activity;
      const promise = Activity.create({ name, description, rating, bookingLink, price, currencyCode, cityId: city.id });
      promises.push(promise);
    });
    await Promise.all(promises);
  }
  catch(err) {
    throw err;
  }
};

seed();