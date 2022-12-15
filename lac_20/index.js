/*## types of middleWare

    1)application level middleware
    2)router level middleware
    3)error-handling  middleware
    4)built-in middleware
    5)third-party middleware
*/

const express = require('express');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
app.use(express.json()); // build-in middleware
app.use(cookieParser()); //third party middleware

// ejs setup
app.set('view engine', 'ejs');

// middleware
//! middleware must be call next() method otherwise middleware stack there

// ? basic middleware
const middleware1 = (req, res, next) => {
  console.log('i am logging1');
  next();
};
const middleware2 = (req, res, next) => {
  console.log('i am logging2');
  next();
};
app.use(middleware2);
app.use(middleware1);

const logger = (req, res, next) => {
  console.log(`${new Date(Date.now())}--${req.method}--${req.originalUrl}`);
  throw new Error('this is an error');
  //   next('something error');// ? if we want to send error
  //   next();
};
app.use(logger);

// {
//   // ? configure middleWare
//   const loggerWrapper = (options) =>
//     function (req, res, next) {
//       if (options.log) {
//         console.log('log true');
//         next();
//       } else {
//         throw new Error('failed to log');
//       }
//     };

//   app.use(loggerWrapper({ log: true }));
// }

app.get('/', (req, res) => {
  res.send('middleware lesson');
});

app.get('/about', (req, res) => {
  res.send('about');
});

// errorMiddleware
const errorMiddleware = (err, req, res, next) => {
  //   console.log(err);
  console.log(err.message);
  res.status(500).send('thre was a server side error');
};
app.use(errorMiddleware);
app.listen(5000, () => {
  console.log(`app running on ${5000}`);
});
