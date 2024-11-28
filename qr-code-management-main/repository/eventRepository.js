const Event = require('../models/event');

const eventRepository = {
  async createEvent(eventData) {
    const event = new Event(eventData);
    return event.save();
  },

  async getEventsByQRCode(qrCodeId) {
    return Event.find({ qrCode: qrCodeId }).sort({ timestamp: -1 });
  },
};

module.exports = eventRepository;
