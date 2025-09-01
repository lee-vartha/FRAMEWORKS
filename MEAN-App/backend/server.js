const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Routes
app.use('/api/accounts', require('./routes/accountRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
