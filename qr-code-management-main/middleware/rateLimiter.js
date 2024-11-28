const rateLimit = require('express-rate-limit');

// Rate limiter for authentication APIs (e.g., login/signup)
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per window
  message: {
    message: 'Too many requests. Please try again after 15 minutes.',
  },
});

// Rate limiter for QR code generation APIs
const qrRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // Limit each IP to 50 requests per hour
  message: {
    message: 'You have reached the QR code generation limit. Please try again later.',
  },
});

// Generic rate limiter for public APIs
const generalRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    message: 'Too many requests. Please slow down.',
  },
});

module.exports = {
  authRateLimiter,
  qrRateLimiter,
  generalRateLimiter,
};
