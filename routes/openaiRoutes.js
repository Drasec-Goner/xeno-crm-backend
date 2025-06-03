const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/parse-prompt', async (req, res) => {
  const { prompt } = req.body;

  try {
    const systemPrompt = `
You are a rule parser for a CRM platform. Convert plain English into structured rules in JSON.
Each rule has:
- field: one of ["spend", "visits", "inactiveDays"]
- operator: one of ">", "<", "="
- value: numeric (in days or rupees)
- logic: "AND" or "OR" (first rule can default to AND)

Only return a JSON array. Do not add text or explain.

Example:
Input: People who haven’t shopped in 6 months and spent over ₹5K
Output:
[
  { "field": "inactiveDays", "operator": ">", "value": "180", "logic": "AND" },
  { "field": "spend", "operator": ">", "value": "5000", "logic": "AND" }
]
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ]
    });

    const parsed = completion.choices[0].message.content;
    const rules = JSON.parse(parsed);
    res.json({ rules });
  } catch (err) {
    console.error('OpenAI error:', err.message);
    res.status(500).json({ error: 'Failed to parse prompt' });
  }
});

router.post('/generate-messages', async (req, res) => {
  const { objective } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a creative marketing assistant. Given a campaign objective, generate 3 concise, personalized SMS messages with a casual tone. Each should be under 160 characters. Return as a JSON array of strings.`
        },
        {
          role: 'user',
          content: `Objective: ${objective}`
        }
      ]
    });

    const messages = JSON.parse(completion.choices[0].message.content);
    res.json({ messages });
  } catch (err) {
    console.error('OpenAI Message Generation Error:', err.message);
    res.status(500).json({ error: 'Failed to generate messages' });
  }
});


module.exports = router;
