# Portfolio Project - Full-Stack Ecommerce App

This Ecommerce store PERN app is a Codecademy Portfolio Project implemented using Node.js, Express.js for backend, PostgreSQL for database. Frontend is implemented using HTML, CSS, Javascript, React, Redux & Bootstrap.

[Live Url](https://ecommerce-pern-app-isam.onrender.com/)

## Project Goal:

Create a modern secure ecommerce app using PERN Stack

## Project Objectives:

### Backend

Build a Fully-functioning e-commerce application REST API that allows users to perform various CRUD operations such as registering an account, browsing products for sale including:

- Build a functioning e-commerce REST API using Express, Node.js, and Postgres
- Allow users to register and log in via the API
- User Authentication & Authorization
- Allow CRUD operations on products
- Allow CRUD operations on user accounts
- Allow CRUD operations on user carts
- Allow a user to place an order
- Allow CRUD operations on orders
- Integrate online payments using Stripe
- Implement best security practices
- Use Git version control
- Use command line
- Document the API using Swagger

### Frontend

Build a functioning e-commerce application using React, Node.js, and Postgres by extending the e-commerce REST API with an interactive client

- Enable users to create a personal account
- Enable users to browse products
- Enable users to complete a purchase using a payment processor 
- Deploy the application using Render


## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [ScreenShots](#screenShots)
- [Improvements](#improvements)


## Features {#features}

#### Users

- User login & registration via local login
- User Authentication & Authorization with Passport.js
- CRUD operations on User
- Store and handle multiple addresses with a default address

#### Shop

- CRUD operations on Products
- CRUD operations on categories and get products by category
- CRUD operations on Cart
- Users can place an order & purchase

#### Checkout

- Handle Shipping & Billing details
- Stripe payment gateway integration with onsite checkout


#### Security

- User Authentication & Authorization
- Custom hashing function to store passwords using bycrypt and salt
- Parameterized queries to protect against SQL injection
- Input validation and sanitizer to protect againt XSS attacks


## Technologies {#technologies}

- HTML
- CSS
- Bootstrap
- React
- Redux
- PostgreSQL
- Node.js
- Express.js


## Screenshots

##### ERD

![Database Design ERD](/erd.png "ERD for Database").


## Upcoming Impovements

- OAuth 2.0 Authentication
- Product Filters
- Product Variations
- Multiple Payment Methods


## Build Instructions

#### Install dependencies

In the project directory, run > npm install

Go to /view directory, run > npm install

In the /view directory, run > npm run build

## Start Command

node app.js



