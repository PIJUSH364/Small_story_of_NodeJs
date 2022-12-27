const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model('User', userSchema);
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkLogin = require('../middlewares/checkLogin');

// signup
router.post('/signup', async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      user: newUser,
      message: 'singUp successfully!',
    });
  } catch (error) {
    res.status(500).json({
      error: 'singUp failed!',
    });
  }
});

router.post('/login',  async (req, res) => {
  const user = await User.find({ username: req.body.username });
  if (user && user.length > 0) {
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user[0].password
    );
    if (isValidPassword) {
      // generate token
      const token = jwt.sign(
        {
          username: user[0].username,
          userId: user[0]._id,
        },
        'jdy3uwdg',
        {
          expiresIn: '189h',
        }
      );
      res.status(200).json({
        accessToken: token,
        message: 'login successful!',
      });
    } else {
      res.status(401).json({
        error: 'Authetication  failed!',
      });
    }
  } else {
    res.status(500).json({
      error: 'Authetication  failed!',
    });
  }
});

module.exports = router;

router.delete('', (req, res) => {});
