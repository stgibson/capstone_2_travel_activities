# [Travel Activities](https://travel-activities.surge.sh/)

## Summary

This website allows users to create an account and search for activities to do
in a specific city and country. They can inspect each activity individually and
create a list of their favorite activities. From this list, they can also create
a travel plan, allocating their favorite activities to each day in a trip.

## Features Implemented

I chose to implement the following features to use a wide range of technologies
I learned in the second half of the course. For example, I decided to require
users to make an account and sign in to the website in order to access its
features. This way, I was able to practice using Bcrypt to encrypt users'
passwords, middleware and JSON Web Tokens to verify a user is logged in, and a
PostgreSQL database to store users. I also wanted to practice dealing with a
more complex database schema, which is required for travel plans. The database
schema also gave me a chance to practice using Redux for more complex data.
These features gave me enough of a challenge that I needed to carefully plan
and think through the entire structure of this app, but I was still able to
enjoy the process of developing this website, and I was able to so it within
a reasonable time frame.

* Users can sign up on the website by providing their username and password
* The server will encrypt passwords using Bcrypt before storing it in the
database
* Users can log in on the website with valid credentials
* Logged in users can log out of their account on the website
* Logged in users can search for a list of activities based on an inputted city
and country
* Logged in users can learn more about a specific activity by clicking on it in
a list of activities
* Logged in users can add an activity to their list of favorite activities
* Logged in users can view their favorite activities
* Logged in users can remove an activity from their list of favorite activities
* Add error handling for routes
* Logged in users can create a new travel plan, where they can specify how many
days will be in their plan
* Logged in users can add a travel activity from their list of favorite
activities to a day in their travel plan
* Logged in users can remove a travel activity from a day in their travel plan
* Logged in users can view a list of their travel plans, and view each one in
detail

## Tests

Each test file is located in the same directory as the file it tests and has the
same name as the file it tests, except with a .test.js extension. In order to
run tests for the back end, run `nmp i` and then `npm test` in the backend/
directory. In order to run tests for the front end, run `npm i` and then
`npm test` in the frontend/ directory.

## API Links
[Amadeus for Developers: Tours and Activities](https://developers.amadeus.com/self-service/category/destination-content/api-doc/tours-and-activities/api-reference)

[Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview)

## APIs

The first API returns a list of activities near a provided latitude and
longitude. This API requires an API key and secret. Also, I am only using the
test version of this API, which allows for up to 1000 requests at limited
cities, such as Paris, France, San Francisco, United States, and London, United
Kingdom.

The second API returns a latitude and longitude for a location in address form.
This API requires an API key as well.

## Technology Stack

* Node.js
* Express.js
* PostgreSQL
* React
* React Bootstrap
* Redux
* Axios
* Bcrypt
* JSON Schema
* JSON Web Token
* Sequelize
* SuperTest
