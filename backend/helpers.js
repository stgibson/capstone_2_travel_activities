require("dotenv").config();
const axios = require("axios");
const Amadeus = require("amadeus");

const BASE_GEOCODING_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_FOR_DEVELOPERS_API_KEY,
  clientSecret: process.env.AMADEUS_FOR_DEVELOPERS_SECRET
});

/**
 * Replaces spaces in address with + to make compatible with API
 * @param {string} address
 * @return encoded address
 */
const urlEncodeAddress = (address) => {
  return address.replace(" ", "+");
}

/**
 * Uses Geocoding API to determine coordinates of given city. If city isn't
 * found, returns null.
 * @param {string} city 
 * @param {string} country 
 * @return coordinates
 */
const cityCountryToLatLon = async (city, country) => {
  // for protection for testing
  if (process.env.NODE_ENV === "test") {
    throw new Error("Should not call cityCountryToLatLon during automated testing");
  }
  throw new Error("Should not call cityCountryToLatLon right now");

  const address = urlEncodeAddress(`${city}, ${country}`);

  const params = { address, key: process.env.GEOCODING_API_KEY };
  const res = await axios.get(BASE_GEOCODING_API_URL, { params });
  if (res.data.results.length === 0) {
    return null;
  }
  const coordinates = res.data.results[0].geometry.location;
  return coordinates;
};

/**
 * Gets activities from Amadeus for Developers API. If error, returns null.
 * @param {number} lat 
 * @param {number} lon 
 * @return activities
 */
const getActivities = async (latitude, longitude) => {
  // for protection for testing
  if (process.env.NODE_ENV === "test") {
    throw new Error("Should not call getActivities during automated testing");
  }
  throw new Error("Should not call getActivities right now");

  const res = await amadeus.shopping.activities.get({ latitude, longitude });
  return res.data;
}

module.exports = { cityCountryToLatLon, getActivities };