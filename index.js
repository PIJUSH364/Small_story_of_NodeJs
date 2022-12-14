const express = require('express');

require("dotenv").config()

const app = express();
app.use(express.json());// req body as a object return
// app.use(express.raw());// req body as a buffer data send

app.get('/', (req, res) => {
    res.send('Express app running');
})

app.post('/', (req, res) => {
    console.log(req.body);
    res.send('post method calling');
})

app.listen(process.env.PORT, () => {
    console.log(`app running on ${process.env.PORT}`);
})