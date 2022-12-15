const express = require('express');

const adminRouter = express.Router();

// {
//   const log = (req, res, next) => {
//     console.log('i am logging ing something');
//     next();
//   };
//   // adminRouter.get('/login', log);//? only login url use
//   adminRouter.all('*', log); //? "*" all url use "log" middleware
// }
adminRouter.param('user', (req, res, next, id) => {
  req.user = id === '1' ? 'admin' : 'Anonymous';
  next();
});

adminRouter.get('/:user', (req, res) => {
  res.send(`this is ${req.user}  home page `);
});

adminRouter.get('/login', (req, res) => {
  res.send('this is admin login page');
});

module.exports = adminRouter;
