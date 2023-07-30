const express = require('express');
const app = express();
const mongoose = require('mongoose');
const personRoutes = require('./routes/personRoutes');
const logger = require('./logger');


// Load environment variables from .env file
require('dotenv').config();

// Middleware to log each request
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Error handling middleware to log errors
app.use((err, req, res, next) => {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    next(err);
});

// Connect to MongoDB
function connectToDatabase() {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    });
    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        setTimeout(connectToDatabase, 5000);
    });
}

// Wait for MongoDB container to start before connecting
connectToDatabase();

app.use(express.json());

// Routes
app.use('/api/persons', personRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
