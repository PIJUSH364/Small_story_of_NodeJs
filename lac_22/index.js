const express = require('express');

require('dotenv').config();

const app = express();
app.use(express.json()); // build-in middleware

app.get('/', (req, res) => {
  //   res.send('Error handling');
  res.send(a);
  //   throw new Error('there is a error');
});


// custom error handler
app.use((err, req, res, next) => {
  //   console.log(err);
  if (err.message) {
    res.status(500).send(err.message);
  } else {
    res.status(500).send('error handling function call');
  }
});

app.listen(5000, () => {
  console.log(`app running on ${5000}`);
});
