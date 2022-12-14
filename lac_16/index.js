const express = require('express');

require("dotenv").config()

const app = express();

// by default router is a caseINSensitive
const router = express.Router({
    caseSensitive:true
});

app.use(router);

router.get('/about', (req, res) => {
  res.send('this is about page');
});

// app.use(express.json());//* req.body as a object return "Content-Type::application/json"
// app.use(express.raw());//* req.body as a buffer data send "Content-Type::application/octet-stream"
// app.use(express.text());//* req.body as a row text data send "Content-Type::text/plain"
// app.use(express.urlencoded());//* req.body as a form data send "Content-Type::application/x-www-form-urlencoded"

// ***static file read
// express.static :: first parameter root file and 2nd parameter optional
app.use(
  express.static(`${__dirname}/public/`, {
    index: 'home.html',
  })
); //? static folder declaration

app.get('/', (req, res) => {
  res.send('Express app running');
});

app.post('/', (req, res) => {
  const data = req.body;
  console.log(data);
  res.send('post method calling');
});

app.listen(process.env.PORT, () => {
    console.log(`app running on ${process.env.PORT}`);
})