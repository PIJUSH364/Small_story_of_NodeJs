const express = require('express');

require('dotenv').config();

const app = express();
app.use(express.json()); // build-in middleware

app.get('/', (req, res) => {
  res.send("file upload");
});

app.listen(5000, () => {
  console.log(`app running on ${5000}`);
});
