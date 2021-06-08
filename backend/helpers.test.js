require("dotenv").config();
const axios = require("axios");
const Amadeus = require("amadeus");
const { cityCountryToLatLng, getActivities } = require("./helpers");

jest.mock("axios");
jest.mock("amadeus");

describe("cityCountryToLatLng", () => {
  it("gets latitude and longitude of city, country", async () => {
    const city = "paris";
    const country = "france";
    const lat = 48.856614;
    const lng = 2.3522219;
    const data = { results: [ { geometry: { location: { lat, lng } } } ] };
    const res = { data };
    const resErr = { data: { results: [] }}

    axios.get.mockImplementation((url, options) => {
      switch (url) {
        case "https://maps.googleapis.com/maps/api/geocode/json":
          if (!options.params) {
            return Promise.resolve(resErr);
          }
          if (!options.params.address ||
            options.params.address !== "paris,+france") {
            return Promise.resolve(resErr);
          }
          if (!options.params.key ||
            options.params.key !== process.env.GEOCODING_API_KEY) {
            return Promise.resolve(resErr);
          }
          return Promise.resolve(res);
        default:
          return Promise.reject(new Error("Invalid URL"));
      }
    });

    const coordinates = await cityCountryToLatLng(city, country);
    
    expect(coordinates.lat).toEqual(lat);
    expect(coordinates.lng).toEqual(lng);
  });
});