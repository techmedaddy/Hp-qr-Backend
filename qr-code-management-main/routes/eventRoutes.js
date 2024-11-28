const express = require('express');
const router = express.Router();
const eventService = require('../services/eventService');
const authenticate = require('../middleware/authenticate');   

// Track Event
router.post('/:qrID/track', async (req, res) => {
  try {
    const { qrID } = req.params;
    const { location, device, userAgent, ipAddress } = req.body;

    const eventData = {
      location,
      device,
      userAgent,
      ipAddress,
    };

    const newEvent = await eventService.trackEvent(qrID, eventData);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Events
router.get('/:qrID/events', authenticate, async (req, res) => {
  try {
    const { qrID } = req.params;

    const events = await eventService.getEvents(qrID);
    res.status(200).json(events);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
