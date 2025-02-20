const axios = require('axios');
require('dotenv').config()
// OpenAI API Key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Controller function to handle OpenAI requests
const generateResponse = async (req, res) => {
    
  const { prompt, model = 'gpt-3.5-turbo', max_tokens = 400, temperature = 0.7 } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens,
        temperature,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    res.json(response.data); // Send the OpenAI API response back to the client
  } catch (error) {
    console.error('Error communicating with OpenAI API:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: error.response?.data || error.message });
  }
};

module.exports = {
  generateResponse,
};
