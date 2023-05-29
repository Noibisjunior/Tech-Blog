const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const authRoute = require('./routes/auth')
const authUser = require('./routes/user')
const authPost = require('./routes/post')
const authCategory = require('./routes/categories');
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(cookieParser())

mongoose
  .connect(process.env.CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('connected to the database'))
  .catch((err) => console.log(err));

app.use('/uploads', express.static(path.join(__dirname,'/upload')));
app.use('/uploads', express.static('uploads'));

const corsOptions = {
  origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));

// app.options('*', cors()); // Enable pre-flight across all routes


app.use('/auth',authRoute)
app.use('/users',authUser)
app.use('/posts',authPost)
app.use('/categories',authCategory)
app.listen('5000',()=>{
     console.log('backend is running');
});