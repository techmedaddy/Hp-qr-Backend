const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const { authRateLimiter, qrRateLimiter, generalRateLimiter } = require('./middleware/rateLimiter');
const swaggerDocs = require('./swagger');
swaggerDocs(app); // Initialize Swagger UI

require('dotenv').config(); // Load environment variables

// Import routes
const userRoutes = require('./routes/userRoutes');
const qrCodeRoutes = require('./routes/qrCodeRoutes');
const eventRoutes = require('./routes/eventRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// Apply middleware
app.use(cors()); // Enable cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(generalRateLimiter); // Apply rate limiter globally

// API Routes
app.use('/auth', userRoutes); // Authentication routes
app.use('/qr', qrCodeRoutes); // QR Code management routes
app.use('/events', eventRoutes); // Event tracking routes
app.use('/analytics', analyticsRoutes); // Analytics routes

// Health check route
app.get('/', (req, res) => {
  res.status(200).send({ message: 'QR Code Management API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
