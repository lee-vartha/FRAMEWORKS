const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
const authRoutes = require('./routes/authRoutes');       
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const tokenRoutes = require('./routes/tokenRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);        // keep if you still need raw users CRUD
app.use('/api/products', productRoutes);
app.use('/api/tokens', tokenRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error(err));
