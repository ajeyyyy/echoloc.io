const express = require('express');
const cors = require("cors");

const connectDB = require('./config/db');

// DB Connection
connectDB();

const app = express();

// Init Middlewares
app.use(cors())
app.use(express.json());

// Defining Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));
app.use('/api/auth', require('./routes/api/auth'));

// app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));