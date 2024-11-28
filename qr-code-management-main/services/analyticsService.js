const analyticsRepository = require('../repository/analyticsRepository');
const qrCodeRepository = require('../repository/qrCodeRepository');

const analyticsService = {
  async getAnalytics(qrID) {
    const qrCode = await qrCodeRepository.getQRCodeById(qrID);
    if (!qrCode) throw new Error('QR Code not found.');

    const [totalScans, uniqueUsers, scansByDate, scansByLocation, deviceStats] = await Promise.all([
      analyticsRepository.getTotalScans(qrCode._id),
      analyticsRepository.getUniqueUsers(qrCode._id),
      analyticsRepository.getScansByDate(qrCode._id),
      analyticsRepository.getScansByLocation(qrCode._id),
      analyticsRepository.getDeviceStats(qrCode._id),
    ]);

    return {
      totalScans,
      uniqueUsers,
      scansByDate,
      scansByLocation,
      deviceStats,
    };
  },
};

module.exports = analyticsService;
