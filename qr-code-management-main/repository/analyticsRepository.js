const Event = require('../models/event');

const analyticsRepository = {
  async getTotalScans(qrCodeId) {
    return Event.countDocuments({ qrCode: qrCodeId });
  },

  async getUniqueUsers(qrCodeId) {
    return Event.distinct('ipAddress', { qrCode: qrCodeId }).then((users) => users.length);
  },

  async getScansByDate(qrCodeId) {
    return Event.aggregate([
      { $match: { qrCode: qrCodeId } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  },

  async getScansByLocation(qrCodeId) {
    return Event.aggregate([
      { $match: { qrCode: qrCodeId } },
      {
        $group: {
          _id: '$location',
          count: { $sum: 1 },
        },
      },
    ]);
  },

  async getDeviceStats(qrCodeId) {
    return Event.aggregate([
      { $match: { qrCode: qrCodeId } },
      {
        $group: {
          _id: '$device',
          count: { $sum: 1 },
        },
      },
    ]);
  },
};

module.exports = analyticsRepository;
