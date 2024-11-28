const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  qrCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QRCode',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  location: {
    latitude: Number,
    longitude: Number,
  },
  device: {
    type: String, // e.g., "iPhone", "Chrome browser"
  },
  userAgent: {
    type: String,
  },
  ipAddress: {
    type: String,
  },
});

module.exports = mongoose.model('Event', EventSchema);
