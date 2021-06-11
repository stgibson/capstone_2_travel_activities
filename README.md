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

## User Flow
If the user is visiting the website for the first time, the user must first
create an account by entering a username and a password. If the user already has
an account, the user must log in using the same username and password the user
used to create an account. The user may search for a list of activities by
entering a city and its country in a form on the Home Page. If there are no
known activities in the user's input, a message will be displayed letting the
user know this. Otherwise, a list of activities by name will be displayed on the
page. The user may navigate to a page showing details on an activity by clicking
on the activity's name. The user can view details on the activity, and the user
may choose to add it to their list of favorite activities. The user may also
click on a link in the navigation bar to see the user's list of favorite
activities. On the favorite activities page, the user may choose to remove an
activity from the user's list. The user can also use the navigation bar to
navigate to a page to create a travel plan. The user creates a travel plan by
entering the name of the travel plan and the number of days in the travel plan
to a form, and then submitting the form. The user will then be redirected to a
page showing a list of the user's travel plans. The user can use the navigation
bar to return to this page any time the user is logged in. The user can click on
a travel plan on this page to navigate to a list of the days in the travel plan,
with each day containing a dropdown menu to select an activity from the user's
favorite activities list to add to the day. Each activity in each day is
displayed with a button the user can click to remove the activity from the day
in the travel plan. The user can also use the navigation bar at any time to
return back to the home page or to log out when the user is done for the day.

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
* Heroku
* Surge
* Git/GitHub
