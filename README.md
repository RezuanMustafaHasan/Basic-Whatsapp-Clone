# WhatsApp Clone

A simple WhatsApp clone built with Node.js, Express, MongoDB, and EJS. This application allows users to register with just a username and exchange messages in real-time.

## Features

- Single page interface
- User registration with just a username (no authentication required)
- Real-time messaging using Socket.io
- Select sender and receiver from dropdown menus
- Message history between users
- Clean and intuitive UI

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Frontend**: EJS, CSS, JavaScript
- **Real-time Communication**: Socket.io

## Prerequisites

- Node.js
- MongoDB

## Project Structure

├── app.js              # Main application file
├── models/             # Database models
│   ├── Message.js      # Message schema
│   └── User.js         # User schema
├── public/             # Static files
│   ├── css/            # Stylesheets
│   │   └── style.css   # Main stylesheet
│   └── js/             # Client-side JavaScript
│       └── main.js     # Main JavaScript file
├── routes/             # Application routes
│   └── index.js        # Main routes
└── views/              # EJS templates
    └── index.ejs       # Main view

