const handle = (req, res) => {
  console.log(req.app.locals.title);
  res.send('this is handle page');
};
module.exports = handle;
