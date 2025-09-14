
// local-server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from public folder
app.use(express.static('public'));

// Basic API endpoint for chatbot
app.post('/api/ai-chatbot', async (req, res) => {
  const { message } = req.body;
  res.json({ reply: `You said: ${message}` });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.send('Server is healthy');
});

app.listen(PORT, () => {
  console.log(`Local server running at http://localhost:${PORT}`);
});
