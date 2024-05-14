const express = require('express');
const axios = require('axios');
const csv = require('csv-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.get('/', async (req, res) => {
  try {
    console.log('Received request at /');
    const response = await axios.get('https://chattiedata.s3.amazonaws.com/chat_profile_probe_base_20_1.csv', {
      responseType: 'stream'
    });

    const results = [];
    response.data.pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        console.log('CSV data loaded:', results); // Add logging here
        res.json(results);
      })
      .on('error', (error) => {
        console.error('Error processing CSV file:', error);
        res.status(500).send('Error processing CSV file');
      });
  } catch (error) {
    console.error('Error loading CSV file:', error);
    res.status(500).send('Error loading CSV file');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
