const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: String,
  rules: Array,
  audienceSize: Number
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);