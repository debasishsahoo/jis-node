// server.js
const express = require('express');
const connectDB = require('./configs/db');
const cors = require('cors');

require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', require('./routes/user.route'));
app.use('/api/product', require('./routes/product.route'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));