const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Customer = require('../models/Customer');
const Campaign = require('../models/Campaign');
const CommunicationLog = require('../models/CommunicationLog');

const evaluateRules = (rules) => {
  const mongoFilters = [];

  rules.forEach((rule) => {
    const condition = {};
    const field = rule.field;
    const op = rule.operator;
    const value = isNaN(rule.value) ? rule.value : Number(rule.value);

    switch (op) {
      case '>':
        condition[field] = { $gt: value };
        break;
      case '<':
        condition[field] = { $lt: value };
        break;
      case '=':
        condition[field] = value;
        break;
    }

    if (Object.keys(condition).length > 0) {
      mongoFilters.push(condition);
    }
  });

  return mongoFilters;
};

// POST /api/campaigns/create
router.post('/create', async (req, res) => {
  try {
    const { rules } = req.body;

    const andConditions = [];
    const orConditions = [];

    rules.forEach((r, i) => {
      const condition = evaluateRules([r])[0];
      if (i === 0 || r.logic === 'AND') andConditions.push(condition);
      else orConditions.push(condition);
    });

    let finalQuery = {};
    if (andConditions.length && orConditions.length) {
      finalQuery = { $and: [ { $and: andConditions }, { $or: orConditions } ] };
    } else if (andConditions.length) {
      finalQuery = { $and: andConditions };
    } else if (orConditions.length) {
      finalQuery = { $or: orConditions };
    }

    const customers = await Customer.find(finalQuery);

    // Save campaign
    const campaign = new Campaign({
      name: `Campaign-${Date.now()}`,
      rules,
      audienceSize: customers.length
    });
    await campaign.save();

    // Simulate delivery logs
    const logs = customers.map((cust) => {
      const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
      const message = `Hi ${cust.name}, here’s 10% off on your next order!`;
      return {
        campaignId: campaign._id,
        customerId: cust._id,
        status,
        message
      };
    });

    const insertedLogs = await CommunicationLog.insertMany(logs);

// Simulate vendor delivery hits after 1–2 seconds
insertedLogs.forEach((log) => {
  setTimeout(async () => {
    try {
      const deliveryStatus = Math.random() < 0.9 ? 'SENT' : 'FAILED';
      await fetch('http://localhost:5000/api/campaigns/receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logId: log._id, status: deliveryStatus })
      });
    } catch (err) {
      console.error('Simulated vendor call failed:', err.message);
    }
  }, Math.random() * 2000 + 500); // Delay 0.5–2.5 sec
});


    res.json({
      count: customers.length,
      customers,
      campaignId: campaign._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/campaigns/receipt
router.post('/receipt', async (req, res) => {
  try {
    const { logId, status } = req.body;

    const log = await CommunicationLog.findById(logId);
    if (!log) {
      return res.status(404).json({ error: 'Log not found' });
    }

    log.status = status;
    log.timestamp = new Date();
    await log.save();

    res.json({ success: true, updated: log });
  } catch (err) {
    console.error('Receipt update failed:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/campaigns/history
router.get('/history', async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    const logs = await CommunicationLog.find();

    const campaignSummaries = campaigns.map((campaign) => {
      const campaignLogs = logs.filter(
        (log) => log.campaignId.toString() === campaign._id.toString()
      );

      const sentCount = campaignLogs.filter((log) => log.status === 'SENT').length;
      const failedCount = campaignLogs.filter((log) => log.status === 'FAILED').length;

      return {
        id: campaign._id,
        name: campaign.name,
        createdAt: campaign.createdAt,
        audienceSize: campaign.audienceSize,
        sent: sentCount,
        failed: failedCount
      };
    });

    res.json(campaignSummaries);
  } catch (err) {
    console.error('Fetch history error:', err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
