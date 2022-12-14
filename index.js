const express = require('express');

require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.send('this is home page');
});

app.listen(process.env.PORT, () => {
  console.log(`app running on ${process.env.PORT}`);
});