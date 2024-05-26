const express = require('express');
const axios = require('axios');
const csv = require('csv-parser');
const cors = require('cors');
const path = require('path');
const { body, validationResult } = require('express-validator');
const pool = require('./db'); // Import the database setup
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'build')));

const baseUrl = 'https://chattiedata.s3.amazonaws.com';

// Ensure this code is present in index.js
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
        console.log('CSV data loaded:', results);
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

app.post('/submit-survey', [
  body('prolific_id').isString(),
  body('uuid').isString(),
  body('data').isObject()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { prolific_id, uuid, data } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO survey_sessions (prolific_id, uuid, data) VALUES ($1, $2, $3) RETURNING id`, 
      [prolific_id, uuid, data]
    );
    res.status(201).send(`Survey response saved with ID: ${result.rows[0].id}`);
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).send('Error saving survey response');
  }
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
  } else {
    console.log(`Server running at http://localhost:${port}`);
  }
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
  process.exit(1);
});
