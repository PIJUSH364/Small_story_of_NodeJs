const express = require('express');

require('dotenv').config();

const app = express();
app.use(express.json()); // *accept jason file

// ejs setup
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('response object lesson');
});



app.listen(5000, () => {
  console.log(`app running on ${5000}`);
});
