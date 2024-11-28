const QRCode = require('../models/QRCode');

const qrCodeRepository = {
  async createQRCode(data) {
    const qrCode = new QRCode(data);
    return qrCode.save();
  },

  async getQRCodeById(qrID) {
    return QRCode.findOne({ qrID });
  },

  async updateDynamicURL(qrID, newURL) {
    return QRCode.findOneAndUpdate(
      { qrID },
      { dynamicURL: newURL, updatedAt: Date.now() },
      { new: true }
    );
  },

  async getAllQRCodesByUser(userId) {
    return QRCode.find({ owner: userId });
  },

  async deleteQRCode(qrID) {
    return QRCode.findOneAndDelete({ qrID });
  },
};

module.exports = qrCodeRepository;
