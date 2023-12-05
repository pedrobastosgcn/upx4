CREATE TABLE IF NOT EXISTS catalog_table (
    id SERIAL PRIMARY KEY,
    material VARCHAR(100) NOT NULL,    
    decomposition_time INT NOT NULL,
    time_unit VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS donations (
    id SERIAL PRIMARY KEY,
    person_name VARCHAR(50) NOT NULL,    
    donator_comment TEXT,
    amount FLOAT NOT NULL
    createdAt TIMESTAMP DEFAULT NOW()
);

INSERT INTO catalog_table (material, decomposition_time, time_unit) VALUES
    ('Papel', 6, 'meses'),
    ('Tecido', 1, 'ano'),
    ('Madeira pintada', 13, 'anos'),
    ('Nylon', 20, 'anos'),
    ('Metal', 100, 'anos'),
    ('Alumínio', 200, 'anos'),
    ('Plástico', 400, 'anos'),
    ('Vidro', 1000, 'anos');