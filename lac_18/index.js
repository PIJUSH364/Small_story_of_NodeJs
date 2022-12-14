const express = require('express');

require('dotenv').config();

const app = express();
app.use(express.json()); // *accept jason file

const adminRoute = express.Router();

app.get('/', (req, res) => {
  res.send('request object lesson');
});

adminRoute.get('/dashboard/:user', (req, res) => {
  console.log(req.baseUrl); // * return baseurl of adminRoute ==> /admin
  console.log(req.originalUrl); // * return except host name(localhost::3000) of this url ==> /admin/dashboard
  //   ! never use (req.Url) this is not a preferable ,req.Url==> core nodeJs method
  console.log(req.hostname); // * return hostname (i.e:xyz.com)
  console.log(req.method); // * return method name (i.e:get,put,post,delete)
  console.log(req.protocol); // * return protocol name (i.e: http,https)
  console.log(req.params); // * return params object { user: 'pijush'; }
  console.log(req.query); // * return query object { filter: 'name' },query object prefix always be "?" sign
  console.log(req.secure); //* return true or false (if https then true,http then false)
  console.log(req.route); //* return route object
  console.log(req.accepts('html')); // if not accept then false and if true then return accept type(json,html)
  console.log(req.get('Content-Type')); // ? return property value (i.e:application/json)

  res.send('admin dashboard');
});

app.use('/admin', adminRoute);

app.listen(5000, () => {
  console.log(`app running on ${5000}`);
});
