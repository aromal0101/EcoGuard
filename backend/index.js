const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'ecoguard',
  host: 'ecoguard.cfi0ykas6xel.ap-south-1.rds.amazonaws.com',
  database: 'ecoguard',
  password: '12345678',
  port: 5432,
});

// JWT Secret Key
const JWT_SECRET = 'cat123';

// Register route
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if the email already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert the new user into the database
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    // Create a JWT token for the user
    const token = jwt.sign({ userId: newUser.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: newUser.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("email is",email)
  try {
    // Find the user by email
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    // Check the password
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credential' });
    }
    // Create a JWT token
    const token = jwt.sign({ userId: user.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: user.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
app.get('/api/species', async (req, res) => {
  const { type, status, habitat, searchTerm } = req.query;

  try {
    let query = `SELECT * FROM endangered_species WHERE 1=1`;
    
    // Add filters based on query parameters
    if (type && type !== 'all') {
      query += ` AND type = '${type}'`;
    }
    if (status && status !== 'all') {
      query += ` AND status = '${status}'`;
    }
    if (habitat && habitat !== 'all') {
      query += ` AND habitat = '${habitat}'`;
    }
    if (searchTerm) {
      query += ` AND LOWER(name) LIKE LOWER('%${searchTerm}%')`;
    }

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching species data:', error);
    res.status(500).send('Server error');
  }
});


app.get('/api/species/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Received request for species with ID:', id);
  try {
    const query = 'SELECT * FROM species WHERE id = $1';
    console.log('Executing query:', query, 'with params:', [id]);
    const { rows } = await pool.query(query, [id]);
    console.log('Query result:', rows);
    
    if (rows.length === 0) {
      console.log('No species found for ID:', id);
      return res.status(404).json({ message: 'Species not found' });
    }
    
    console.log('Sending response:', rows[0]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching species:', error);
    res.status(500).json({ message: 'Internal server error', error: error.toString() });
  }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});