const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
// const secretKey = 'asfgtdjvfyuhiobmsp';

router.post('/register', async (req, res) => {
  try {
    const { email,username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // res.cookie('token', token, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000, // 1 day
    //   sameSite: 'lax',
    // });
    // console.log(token);
    res.status(200).json({ message: 'Registration successful', user });
  } catch (error) {
    res.status(500).json(error);
  }
});

//login
router.post('/login', async (req, res) => {
  try {
        const { email, password } = req.body;

    const user = await User.findOne({ username: req.body.username });

    //if no user exist
    if (!user) {
      return res.status(400).json('no user found');
    }

    //if user does exist then compare password
    const validate = await bcrypt.compare(req.body.password, user.password); //compares password from the form and the database
    !validate && res.json('wrong credentials');

    // const token = jwt.sign({ id: user._id },secretKey, { expiresIn: '1d' });
    // res.cookie('token', token, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000, // 1 day
    //   sameSite: 'lax',
    // });
    res.status(200).json( { user: { id: user._id, email: user.email }  });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
  //     const {password, ...other} =  user._doc
  //  return res.status(200).json(other)
});

module.exports = router;
