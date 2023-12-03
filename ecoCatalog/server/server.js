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


 //Rotas CRUD do catálogo de decomposição

 // (CREATE) POST endpoint para salvar uma nova entrada de catálogo no banco de dados
app.post('/api/catalog-item', async (req, res) => {
  const { material, decomposition_time, time_unit } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO catalog_table (material, decomposition_time, time_unit) VALUES ($1, $2, $3) RETURNING *',
      [material, decomposition_time, time_unit]
    );

    res.status(201).json(result.rows[0]);
    console.log("request received, POST sucessful");

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// (READ) GET endpoint para obter o catálogo completo do banco de dados
app.get('/api/full-catalog', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM catalog_table');
    res.json(result.rows);
    console.log("request received, GET sucessful");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// (UPDATE) PUT endpoint para atualizar um registro no banco de dados através do Id
app.put('/api/catalog/:id', async (req, res) => {
  const itemId = req.params.id;
  const { material, decomposition_time, time_unit } = req.body;

  try {
    const result = await pool.query(
      'UPDATE catalog_table SET material = $1, decomposition_time = $2, time_unit = $3 WHERE id = $4 RETURNING *',
      [material, decomposition_time, time_unit, itemId]
    );

    if (result.rows.length === 0) {
      // Nenhuma row atualizada (item with the specified ID not found)
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// (DELETE) DELETE endpoint para excluir um registro no banco de dados pelo Id
app.put('/api/catalog/:id', async (req, res) => {
  const itemId = req.params.id;
  
  try {
    const result = await pool.query(
      'DELETE FROM catalog_table WHERE id = $1 RETURNING *',
      [itemId]
    );

    if (result.rows.length === 0) {
      // Nenhuma row deletada (item with the specified ID not found)
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.json({ message: 'Item deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add more endpoints for CRUD operations...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});