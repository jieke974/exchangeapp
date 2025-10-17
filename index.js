//require('dotenv').config();
// app.js


// app.js
import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import axios from 'axios';

const app = express();


app.use(express.json());

// API endpoint
app.get('/api/exchange-rates', async (req, res) => {
  try {
    const apiUrl = `${process.env.API_BASE_URL}/${process.env.API_KEY}/latest/USD`;
    const response = await axios.get(apiUrl);
    const apiResponse = response.data;

    if (apiResponse.result && apiResponse.result !== 'success') {
      throw new Error(apiResponse['error-type'] || 'API returned an error');
    }

    res.json({ success: true, data: apiResponse });

  } catch (error) {
    console.error('Backend Error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});



app.get('/', (req, res) => {
   res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});





app.listen(8000)
export default app;