const qrCodeRepository = require('../repository/qrCodeRepository');
const crypto = require('crypto');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

const qrCodeService = {
  async generateStaticQRCode(ownerId, initialURL, metadata) {
    const qrID = crypto.randomUUID();
    const qrCodeData = {
      owner: ownerId,
      type: 'static',
      initialURL,
      qrID,
      metadata,
    };

    // Save QR code to the database
    const createdQRCode = await qrCodeRepository.createQRCode(qrCodeData);

    // Generate a PNG QR code
    const qrCodePath = path.join(__dirname, `../qrcodes/${qrID}.png`);
    await QRCode.toFile(qrCodePath, initialURL, {
      width: 300,
      margin: 2,
    });

    // Attach QR code path to the response
    createdQRCode.qrCodeImagePath = qrCodePath;
    console.log(qrCodePath);
    return createdQRCode;
  },

  async generateDynamicQRCode(ownerId, initialURL, metadata) {
    const qrID = crypto.randomUUID();
    const qrCodeData = {
      owner: ownerId,
      type: 'dynamic',
      initialURL,
      dynamicURL: initialURL, // Initially set dynamic URL to the provided URL
      qrID,
      metadata,
    };

    // Save QR code to the database
    const createdQRCode = await qrCodeRepository.createQRCode(qrCodeData);

    // Generate a PNG QR code
    const qrCodePath = path.join(__dirname, `../qrcodes/${qrID}.png`);
    await QRCode.toFile(qrCodePath, initialURL, {
      width: 300,
      margin: 2,
    });

    // Attach QR code path to the response
    createdQRCode.qrCodeImagePath = qrCodePath;
    return createdQRCode;
  },

  async updateDynamicQRCode(qrID, newURL) {
    const qrCode = await qrCodeRepository.getQRCodeById(qrID);
    if (!qrCode) throw new Error('QR Code not found.');
    if (qrCode.type !== 'dynamic') throw new Error('Cannot update a static QR Code.');

    // Update dynamic URL in the database
    const updatedQRCode = await qrCodeRepository.updateDynamicURL(qrID, newURL);

    // Regenerate the PNG QR code with the updated URL
    const qrCodePath = path.join(__dirname, `../qrcodes/${qrID}.png`);
    await QRCode.toFile(qrCodePath, newURL, {
      width: 300,
      margin: 2,
    });

    // Attach updated QR code path to the response
    updatedQRCode.qrCodeImagePath = qrCodePath;
    return updatedQRCode;
  },

  async getQRCodeDetails(qrID) {
    const qrCode = await qrCodeRepository.getQRCodeById(qrID);
    if (!qrCode) throw new Error('QR Code not found.');

    // Include the QR code file path for convenience
    const qrCodePath = path.join(__dirname, `../qrcodes/${qrID}.png`);
    if (fs.existsSync(qrCodePath)) {
      qrCode.qrCodeImagePath = qrCodePath;
    } else {
      qrCode.qrCodeImagePath = null;
    }

    return qrCode;
  },

  async listQRCodesByUser(userId) {
    console.log(userId);

    const qrCodes = await qrCodeRepository.getAllQRCodesByUser(userId);

    // Attach QR code image paths to each QR code
    return qrCodes.map((qrCode) => {
      const qrCodePath = path.join(__dirname, `../qrcodes/${qrCode.qrID}.png`);
      if (fs.existsSync(qrCodePath)) {
        qrCode.qrCodeImagePath = qrCodePath;
      } else {
        qrCode.qrCodeImagePath = null;
      }
      return qrCode;
    });
  },

  async deleteQRCode(qrID) {
    const qrCode = await qrCodeRepository.getQRCodeById(qrID);
    if (!qrCode) throw new Error('QR Code not found.');

    // Delete the QR code image file if it exists
    const qrCodePath = path.join(__dirname, `../qrcodes/${qrID}.png`);
    if (fs.existsSync(qrCodePath)) {
      fs.unlinkSync(qrCodePath);
    }

    return qrCodeRepository.deleteQRCode(qrID);
  },
};

module.exports = qrCodeService;
