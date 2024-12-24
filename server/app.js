const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const router = require('./routes/router');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors(
  {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }
));

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