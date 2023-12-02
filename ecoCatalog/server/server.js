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

// GET endpoint para obter o catálogo completo do banco de dados
app.get('/api/full-catalog', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM catalog_table');
    res.json(result.rows);
    console.log("request received, response: " + result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST endpoint para salvar uma nova entrada de catálogo no banco de dados
app.post('/api/catalog-item', async (req, res) => {
  const { material, decomposition_time, time_unit } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO catalog_table (material, decomposition_time, time_unit) VALUES ($1, $2, $3) RETURNING *',
      [material, decomposition_time, time_unit]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add more endpoints for CRUD operations...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});