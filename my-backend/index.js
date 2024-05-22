const express = require('express');
const axios = require('axios');
const csv = require('csv-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

const baseUrl = 'https://chattiedata.s3.amazonaws.com';

app.get('/load-csv', async (req, res) => {
  const { type, stage, num } = req.query;

  if (!type || !stage || !num) {
    return res.status(400).send('Missing query parameters. Please provide type, stage, and num.');
  }

  const fileName = `chat_${type}_probe_${stage}_20_${num}.csv`;
  const fileUrl = `${baseUrl}/${fileName}`;

  try {
    console.log(`Received request for ${fileName}`);
    const response = await axios.get(fileUrl, {
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
