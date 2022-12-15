const express = require('express');

require('dotenv').config();

const app = express();
app.use(express.json()); // *accept jason file

// ejs setup
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('response object lesson');
});

app.get('/contact', (req, res) => {
  res.send('you are redirect to contact page');
});

app.get('/about', (req, res) => {
  // redirect to another route
  // res.redirect('/contact');

  // ? response set and get
  res.set('platform', 'youTube');
  console.log(res.get('platform'));

  // res.json({
  //   name: 'pijush',
  // }); //? if we want to send jason object then use jason()

  // res.format({
  //   'text/plain': () => {
  //     res.send('only plain text accept');
  //   },
  //   'application.json': () => {
  //     res.send('only json accept');
  //   },
  //   default: () => {
  //     res.status(406).send('not acceptable');
  //   },
  // });

  // res.cookie('name', 'pijush ray mondal'); //? cookie setup
  // res.location('/test');//? location setup

  // res.send('with data send'); //* with data send we use send() method
  // res.send(200);//* status set ,but response not ending
  // res.sendStatus(403); //* status set as well as  ending response
  res.end(); // without data we use end() method
});

app.listen(5000, () => {
  console.log(`app running on ${5000}`);
});
