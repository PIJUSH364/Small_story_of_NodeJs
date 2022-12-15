const express = require('express');

const publicRouter = express.Router();

publicRouter.param((param, option) => (req, res, next, id) => {
  if (id === option) {
    console.log(id);
    next();
  } else {
    res.sendStatus(403);
  }
});

publicRouter.param('user', "23");

publicRouter.get('/:user', (req, res) => {
  res.send(`this is  home page `);
});

publicRouter.get('/login', (req, res) => {
  res.send('this is publicRouter login page');
});

module.exports = publicRouter;
