const express = require('express');
const handle = require('./handle');

require('dotenv').config();

const app = express();
const admin = express();

// ejs setup
app.set('view engine', 'ejs');

// ? by default express case sensitive off ,if we want to active case sensitive the enable similar to disable work same also
// app.enable('case sensitive routing');
// console.log(app.enabled('case sensitive routing'));//* return true or false

app.use('/admin', admin);

admin.get('/', (req, res) => {
  res.send('admin home page');
});

//! params use case
// ? params take four argument 1st req,2nd res,3rd next(*impotent),4th params parameter(id)
app.param('id', (req, res, next, id) => {
  const user = {
    userId: id,
    name: 'nodejs',
  };
  req.userDetails = user;
  next();
});

app.get('/user/:id', (req, res) => {
  console.log(req.userDetails);
  res.send('user params checking');
});

admin.on('mount', (parent) => {
  console.log('Admin Mounted');
  console.log(parent); // refers to the parent app
});

admin.get('/dashBoard', (req, res) => {
  console.log(admin.mountpath); //*base path return ==> /admin
  res.send('admin dashBoard page');
});

app.locals.title = 'application object locals';

app.get('/A', (req, res) => {
  res.send('this is lac_17 home page');
});

// ? all method  is a universal route it's accepts get,put,post,delete all types of method
// app.all('/', (req, res) => {
//   res.send('all method call');
// });

// ! multiple rote method on a single page

app
  .route('/student/mission')
  .get((req, res) => {
    res.send('multiple rote method on a single page ,get');
  })
  .post((req, res) => {
    res.send('multiple rote method on a single page ,post');
  })
  .put((req, res) => {
    res.send('multiple rote method on a single page ,put');
  })
  .delete((req, res) => {
    res.send('multiple rote method on a single page ,delete');
  });

// ! ejs file render on client side

app.get('/employee', (req, res) => {
  // ? render method take two argument 1st is path,2nd is any thing pass as a object (this is also optional)
  res.render('pages/employee', {
    country: 'INDIA',
  });

  // ? check header send status
   console.log(res.headersSent);// return true or false
});

app.get('/handle', handle);

app.listen(5000, () => {
  console.log(`app running on ${5000}`);
});
