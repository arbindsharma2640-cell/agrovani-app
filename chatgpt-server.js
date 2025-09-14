// chatgpt-server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = 5000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/ai-chatbot', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ reply: 'No message provided.' });
  }
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful agriculture assistant. Answer in simple Hindi or English so farmers can easily understand.' },
          { role: 'user', content: message },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not get a response.';
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ reply: 'Error connecting to OpenAI.' });
  }
});

app.listen(PORT, () => {
  console.log(`ChatGPT server running at http://localhost:${PORT}`);
});
