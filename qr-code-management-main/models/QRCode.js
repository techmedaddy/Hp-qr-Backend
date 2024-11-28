const mongoose = require('mongoose');

const QRCodeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['static', 'dynamic'],
    required: true,
  },
  initialURL: {
    type: String,
    required: true,
  },
  dynamicURL: {
    type: String, // Only for dynamic QR codes
  },
  qrCodeImagePath: {
    type: String, // Add this field to store the image path
  },
  qrID: {
    type: String, // Unique identifier for the QR code
    unique: true,
    required: true,
  },
  metadata: {
    description: String,
    campaign: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('QRCode', QRCodeSchema);
