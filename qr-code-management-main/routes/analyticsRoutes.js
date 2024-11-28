const express = require('express');
const router = express.Router();
const analyticsService = require('../services/analyticsService');
const authenticate = require('../middleware/authenticate');

// Get Analytics
router.get('/:qrID', authenticate, async (req, res) => {
  try {
    const { qrID } = req.params;
    const analytics = await analyticsService.getAnalytics(qrID);
    res.status(200).json(analytics);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
