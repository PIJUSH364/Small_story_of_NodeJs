const express = require('express');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(express.json()); // build-in middleware

// app.get('/', (req, res, next) => {
//   fs.readFile('/random--doses--nit--exist_file', (err, data) => {
//     if (err) {
//       next(`next err:: ${err}`);
//     } else {
//       res.send(data);
//     }
//   });
// });

// app.get('/', (req, res, next) => {
//   setTimeout(() => {
//     try {
//       console.log(a); //here error seen then try block end and catch block execute and next error shown
//     } catch (error) {
//       next(error);
//     }
//   }, 100);
// });

// custom error handler
app.use((err, req, res, next) => {
  if (err.headerSent) {
    next('there is a problem');
  } else {
    if (err.message) {
      res.status(500).send(err.message);
    } else {
      res.send('there were an error!');
    }
  }
});

app.listen(5000, () => {
  console.log(`app running on ${5000}`);
});
