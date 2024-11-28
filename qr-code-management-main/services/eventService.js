const eventRepository = require('../repository/eventRepository');
const qrCodeRepository = require('../repository/qrCodeRepository');

const eventService = {
  async trackEvent(qrID, eventData) {
    // Find the associated QR code
    const qrCode = await qrCodeRepository.getQRCodeById(qrID);
    if (!qrCode) throw new Error('QR Code not found.');

    // Create and store the event
    const newEvent = await eventRepository.createEvent({
      qrCode: qrCode._id,
      ...eventData,
    });

    return newEvent;
  },

  async getEvents(qrID) {
    // Find the associated QR code
    const qrCode = await qrCodeRepository.getQRCodeById(qrID);
    if (!qrCode) throw new Error('QR Code not found.');

    // Retrieve all events linked to the QR code
    return eventRepository.getEventsByQRCode(qrCode._id);
  },
};

module.exports = eventService;
