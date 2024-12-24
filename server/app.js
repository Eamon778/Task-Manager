const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const router = require('./routes/router');

const app = express();

app.use(express.json());

app.use('/api', router);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Something went wrong', error);
  }
};

start();