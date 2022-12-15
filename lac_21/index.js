const express = require('express');
const adminRouter = require('./adminRouter');
const publicRouter = require('./publicRouter');

require('dotenv').config();

const app = express();
app.use(express.json()); // build-in middleware

app.get('/', (req, res) => {
  res.send('router lesson');
});

app.use('/admin', adminRouter);
app.use('/public', publicRouter);

app.listen(5000, () => {
  console.log(`app running on ${5000}`);
});
