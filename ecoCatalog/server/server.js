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


 //Rotas CRUD do catálogo de decomposição (catalog_table no postgreSQL)

 // (CREATE) POST endpoint para salvar uma nova entrada de catálogo no banco de dados
app.post('/api/catalog-item', async (req, res) => {
  const { material, decomposition_time, time_unit } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO catalog_table (material, decomposition_time, time_unit) VALUES ($1, $2, $3) RETURNING *',
      [material, decomposition_time, time_unit]
    );

    res.status(201).json(result.rows[0]);
    console.log(" POST api/catalog-item request received, POST sucessful");

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
    console.log("GET api/full-catalog request received, GET sucessful");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// (READ) GET endpoint para obter um item do catálogo pelo Id
app.get('/api/catalog/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM catalog_table WHERE id = $1',
    [itemId]
    );
    res.json(result.rows);
    console.log(`GET api/catalog/${itemId} request received, GET sucessful`);
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
      console.log(`PUT api/catalog/${itemId} request received, PUT sucessful`);

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// (DELETE) DELETE endpoint para excluir um registro no banco de dados pelo Id
app.delete('/api/catalog/:id', async (req, res) => {
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
      console.log(`DELETE api/catalog/${itemId} request received, DELETE sucessful`);

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//Rotas CRUD do catálogo de doações (donations no postgreSQL)

// (CREATE) POST para adicionar nova doação no banco
app.post('/api/donation', async (req, res) => {
  const { person_name, donator_comment, amount } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO donations (person_name, donator_comment, amount) VALUES ($1, $2, $3) RETURNING *',
      [person_name, donator_comment, amount]
    );

    res.status(201).json(result.rows[0]);
    console.log("POST api/donation request received, POST sucessful");

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// (READ) GET endpoint para obter todos os doadores (query param to see the order)
app.get('/api/top-donations', async (req, res) => {
  try {
    const { desc } = req.query;

    let sortOrder = 'ASC'; // Default to ascending order
    if (desc && desc.toLowerCase() === 'true') {
      sortOrder = 'DESC'; // If desc is true, switch to descending order
    }

    const query = `
      SELECT * 
      FROM donations 
      ORDER BY amount ${sortOrder}
      LIMIT 10`;

    const result = await pool.query(query);
    res.json(result.rows);
    console.log("GET api/top-donations request received, GET sucessful");

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// (READ) GET endpoint para as últimas 10 doações
app.get('/api/recent-donations', async (req, res) => {
  try {
    const query = `
      SELECT *
      FROM donations
      ORDER BY createdAt DESC
      LIMIT 10;
    `;

    const result = await pool.query(query);
    res.json(result.rows);
    console.log("GET api/recent-donations request received, GET sucessful");
  } catch (error) {
    console.error('Error retrieving recent donations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// (READ) GET endpoint para obter uma donation através do nome
app.get('/api/donations/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const result = await pool.query('SELECT * FROM donations WHERE person_name = $1',
    [name]
    );
    res.json(result.rows);
    console.log(`GET api/donations/${name} request received, GET sucessful`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// (DELETE) DELETE endpoint para excluir um registro no banco de dados pelo Id
app.delete('/api/donations/:id', async (req, res) => {
  const itemId = req.params.id;
  
  try {
    const result = await pool.query(
      'DELETE FROM donations WHERE id = $1 RETURNING *',
      [itemId]
    );

    if (result.rows.length === 0) {
      // Nenhuma row deletada (item with the specified ID not found)
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.json({ message: 'Item deleted successfully' });
      console.log(`DELETE api/donations/${itemId} request received, DELETE sucessful`);

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});