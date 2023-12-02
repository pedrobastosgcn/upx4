// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecocatalogdb',
  password: 'gremio',
  port: 5432,
});

app.use(bodyParser.json());

// Example endpoint to get data from the database
app.get('/api/fullCatalog', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM catalog_table');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add more endpoints for CRUD operations...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});