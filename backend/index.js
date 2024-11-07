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

//serach  page
app.get('/api/species', async (req, res) => {
  const { kingdomName, redlistcategory, populationtrend, searchTerm } = req.query;
  console.log(kingdomName)
  try {
    const queryParams = [];
    let query = `
   SELECT 
    ss."assesmentid",
    t."scientificName",
    t."kingdomName",
    ss."redlistcategory",
    ss."populationtrend"
FROM speciesstatus ss
INNER JOIN speciesconservation sc ON sc."assessmentId" = ss."assesmentid"
INNER JOIN taxonomy t ON t."internalTaxonId" = sc."internalTaxonId"
WHERE 1=1 `;

    if (kingdomName && kingdomName !== 'all') {
      query += `AND t."kingdomName" = $${queryParams.length + 1}`;
      queryParams.push(kingdomName);
    }
    if (redlistcategory && redlistcategory !== 'all') {
      query += ` AND ss.redlistcategory = $${queryParams.length + 1}`;
      queryParams.push(redlistcategory);
    }
    if (populationtrend && populationtrend !== 'all') {
      query += ` AND ss.populationtrend = $${queryParams.length + 1}`;
      queryParams.push(populationtrend);
    }
    if (searchTerm) {
      query += ` AND t."scientificName" LIKE $${queryParams.length + 1}`;
      queryParams.push(`%${searchTerm}%`);
    }

    console.log('Executing query:', query, 'with params:', queryParams);

    const result = await pool.query(query, queryParams);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching species data:', error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/species/:assessmentId', async (req, res) => {
  const { assessmentId } = req.params;
  console.log('Received request for species with assessmentId:', assessmentId);

  try {
    const query1 = `
              SELECT *                                                            
              FROM speciesstatus ss
              INNER JOIN speciesconservation sc ON ss."assesmentid" = sc."assessmentId"
              INNER JOIN taxonomy t ON sc."internalTaxonId" = t."internalTaxonId"
              INNER JOIN speciesdetails sd ON sc."assessmentId" = sd."assessmentId"
              INNER JOIN speciesthreats st ON sd."assessmentId" = st."assessmentId"
              WHERE ss."assesmentid" = $1
              `;

    console.log('Executing query:', query1, 'with params:', [assessmentId]);
    const { rows } = await pool.query(query1, [assessmentId]);
    console.log('Query result:', rows);

    if (rows.length === 0) {
      console.log('No species found for assessmentId:', assessmentId);
      return res.status(404).json({ message: 'Species not found' });
    }

    console.log('Sending response:', rows[0]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching species:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: error.toString(),
      stack: error.stack
    });
  }
});

app.post('/api/donate', async (req, res) => {
  const { speciesId, donationAmount, name, email, message } = req.body;

  try {
      const result = await pool.query(
          'INSERT INTO donations (species_id, donation_amount, donor_name, email, message) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [speciesId, donationAmount, name, email, message]
      );
      res.status(201).json({ success: true, donation: result.rows[0] });
  } catch (error) {
      console.error('Error storing donation:', error);
      res.status(500).json({ success: false, message: 'Error storing donation.' });
  }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
