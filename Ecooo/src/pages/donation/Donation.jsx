import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SimpleFooter from '../../components/SimpleFooter/SimpleFooter';
import logo from '../../assets/ecoguard.png';

const DonationPage = ({ speciesDetails = {} }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleDonate = async (e) => {
    e.preventDefault();

    const donationData = {
      speciesId: speciesDetails.id, // Assuming speciesDetails contains an `id` for the species
      donationAmount,
      name,
      email,
      message,
    };

    try {
      const response = await fetch('http://localhost:3000/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donationData),
      });

      const result = await response.json();
      if (result.success) {
        alert(`Thank you for your donation of $${donationAmount}!`);
        setDonationAmount('');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('There was an issue with your donation. Please try again.');
      }
    } catch (error) {
      console.error('Error making donation:', error);
      alert('There was an error processing your donation.');
    }
  };

  return (
    <>
      {/* Full-width header outside of donation container */}
      <header className="header2" style={styles.headerContainer}>
        <Link to={'/'}>
          <img src={logo} alt="EcoGuard Logo" className="logo" style={styles.logo} />
        </Link>
        <h1 style={styles.pageTitle}>
          {speciesDetails.scientificName || 'Donation'}
        </h1>
      </header>
      
      {/* Donation container */}
      <div style={styles.container}>
        <h1 style={styles.header}>Support Wildlife Conservation</h1>
        <p style={styles.description}>
          Your donation helps us protect endangered species and preserve biodiversity.
        </p>
        <form style={styles.form} onSubmit={handleDonate}>
          <label style={styles.label}>Donation Amount (USD):</label>
          <input
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            required
            style={styles.input}
            placeholder="Enter amount"
          />
          
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
            placeholder="Your name"
          />
          
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            placeholder="Your email"
          />
          
          <label style={styles.label}>Message (optional):</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.textarea}
            placeholder="Leave a message (optional)"
          />
          
          <button type="submit" style={styles.button}>Donate</button>
        </form>
      </div>
      <SimpleFooter/>
    </>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f7f9fc',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px'
  },
  logo: {
    width: '75px',
    height: '75px'
  },
  pageTitle: {
    fontSize: '22px',
    color: '#2d3748'
  },
  header: {
    fontSize: '24px',
    color: '#2d3748'
  },
  description: {
    fontSize: '16px',
    color: '#4a5568',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  label: {
    fontSize: '14px',
    textAlign: 'left',
    color: '#4a5568'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #cbd5e0',
    borderRadius: '4px'
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #cbd5e0',
    borderRadius: '4px',
    minHeight: '80px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#ffffff',
    backgroundColor: '#3182ce',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px'
  }
};

export default DonationPage;
