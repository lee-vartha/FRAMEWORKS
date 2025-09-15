// referencing necessary modules (express, mongoose, cors, dotenv for environment variables)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// app initialization and middleware setup
const app = express();
app.use(cors());
app.use(express.json());

// routes referencing
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const tokenRoutes = require('./routes/tokenRoutes');

// using the routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);      
app.use('/api/products', productRoutes);
app.use('/api/tokens', tokenRoutes);

// connecting to mongo db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    // ensure its listening on port 5000 or the port defined in the .env file
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error(err));
