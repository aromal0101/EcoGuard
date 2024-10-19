import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SimpleFooter from '../../components/SimpleFooter/SimpleFooter';
import logo from '../../assets/ecoguard.png';
import './SpeciesDetail.css';

const SpeciesDetail = () => {
  const { id } = useParams();
  const [speciesDetails, setSpeciesDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeciesDetails = async () => {
      try {
        console.log('Fetching species with ID:', id);
        const response = await fetch(`http://localhost:3000/api/species/${id}`);
        
        // Log the raw response
        const rawResponse = await response.text();
        console.log('Raw response:', rawResponse);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse the response only if it's not empty
        const data = rawResponse ? JSON.parse(rawResponse) : null;
        setSpeciesDetails(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeciesDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!speciesDetails) {
    return <div>No species found.</div>;
  }

  return (
    <div>
    <div className="speciesDetailsContainer">
      <header className="header2">
        <Link to={'/'}>
          <img src={logo} alt="EcoGuard Logo" className="logo" />
        </Link>
        <h1>{speciesDetails.name}</h1>
      </header>
      <main className="speciesDetailsContent">
        <div className="detailsCard">
          <h2>Details</h2>
          <p><strong>Name:</strong> {speciesDetails.name}</p>
          <p><strong>Type:</strong> {speciesDetails.type}</p>
          <p><strong>Status:</strong> {speciesDetails.status}</p>
          <p><strong>Population:</strong> {speciesDetails.population}</p>
          <p><strong>Habitat:</strong> {speciesDetails.habitat}</p>
        </div>
        <div className="threatsCard">
          <h2>Threats</h2>
          <p>{speciesDetails.threats}</p>
        </div>
      </main>
      
    </div>
    <SimpleFooter />
    </div>
  );
};

export default SpeciesDetail;