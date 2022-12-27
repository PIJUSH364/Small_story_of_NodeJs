const express = require('express');
const mongoose = require('mongoose');
const dbConnect = require('../Db/connectDb');
const todoHandler = require('../routeHandler/todoHandler');
const userHandler = require('../routeHandler/userHandler');

require('dotenv').config();

const app = express();
app.use(express.json()); // build-in middleware

// connect with data base
dbConnect();


// application routes
// home route
app.get('/', (req, res) => {
  res.send('Mongoose');
});

app.use('/todo', todoHandler);
app.use('/user', userHandler);

// default error handler
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};
app.use(errorHandler);
app.listen(5000, () => {
  console.log(`app running on ${5000}`);
});

