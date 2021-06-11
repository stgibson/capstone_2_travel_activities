# Capstone 2 Project Proposal

## Goal

The goal of this project is to create a website that allows users to find
activities they can plan to do on a trip to a specific country or city and
create a travel plan for their trip. The website will be back-end focused and
use React, Redux, Node, Express, and PostgreSQL.

## Demographics

The target audience for this website is people who love traveling but are too
busy with their normal day-to-day work schedule to be able to do extensive
research on traveling activities.

## API

I will be using two APIs for this project. The main API I will be using will be
the Tours and Activities API from Amadeus for Developers. This API provides
information on activities at a given set of coordinates. In order to make the
website more user friendly, I will also be using the Geocoding API to get the
coordinates from a provided city.

## Summary

### Database Schema

The database for the website will have models for users, cities, countries,
activities, plans, and days. The user model will include their username,
encrypted password, a list of the user's favorite activities, and a list of the
user's plans. The city model will include its name, its country, and a list of
activities. The country model will include its name and a list of cities. The
activity model will include its name, a short description, its rating, its
booking link, its price, its currency code, the city it's located in, and a list
of the days of plans it is used. The plan model will include its name, a list of
days, and the user who created the plan. The day model will include its number,
its plan, and a list of activities.

### Potential Issues

The API has a free trial with access to a limited number of cities, which I will
need to keep in mind when testing, and it has a maximum number of 1000 API
requests I can make. I will probably not hit that number, but if I do, I can
create another account with another email address to get a new token. Also, this
is a beta API, so I will need to keep that in mind and check the website if the
API suddenly seems to not be working.

### Sensitive Information

The server will need to protect the users' username and password. The password
will be encrypted using Bcrypt.

### Minimum Viable Product

An MVP will have the following functionality:
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

### User Flow

If the user is visiting the website for the first time, the user must first
create an account by entering a username and a password. If the user already has
an account, the user must log in using the same username and password the user
used to create an account. The user may search for a list of activities by
entering a city and its country in a form on the Home Page. If there are no
known activities in the user's input, a message will be displayed letting the
user know this. Otherwise, a list of activities by name will be displayed on the
page. The user may navigate to an activity's Activity Page by clicking on the
activity's name. The user can view details on the activity, and the user may
choose to add it to their list of favorite activities. The user may also click
on a link in the navigation bar to see the user's list of favorite activities.
On the favorite activities page, the user may choose to remove an activity from
the user's list. The user can also use the navigation bar at any time to return
back to the home page or to log out when the user is done for the day.

### Backlog

The following is a list of backlog features for future versions of the project:
* Logged in users can remove an activity from their list of favorite activities
* Activity Details Page shows location name
* Going back to Home page, can still see previous search results
* Add error handling for routes
* Logged in users can create a new travel plan, where they can specify how many
days will be in their plan
* Logged in users can add a travel activity from their list of favorite
activities to a day in their travel plan
* Logged in users can remove a travel activity from a day in their travel plan
* Logged in users can view a list of their travel plans, and view each one in
detail
* Redux store persists with local storage
* Add an About Page
* Add a Contact Page
* Add a way to share travel plans with other users
* Add a way for users to give feedback on other users' travel plans
* Add a way for users to add new activities for a city
* Make the input for countries a dropdown
* Allow users to edit the number of days in a travel plan or to edit the name
of the travel plan
* Allow users to change the user's username or password
* Logged in users can delete their accounts
* Determine and display cost of travel plans
* Make it so that the order of activities in each day of a travel plan are
stored
* Avoid duplicating activities for cities nearby
* Create admin users
