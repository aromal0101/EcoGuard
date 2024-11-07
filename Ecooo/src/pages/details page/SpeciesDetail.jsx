import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SimpleFooter from '../../components/SimpleFooter/SimpleFooter';
import logo from '../../assets/ecoguard.png';
import './SpeciesDetail.css';

const SpeciesDetail = () => {
  const { assessmentId } = useParams();
  const [speciesDetails, setSpeciesDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeciesDetails = async () => {
      try {
        console.log('Fetching species with assessmentId:', assessmentId);
        const response = await fetch(`http://localhost:3000/api/species/${assessmentId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        setSpeciesDetails(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (assessmentId) {
      fetchSpeciesDetails();
    }
  }, [assessmentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!speciesDetails) {
    return <div>No species found for assessmentId: {assessmentId}</div>;
  }

  return (
    <div className="speciesDetailsContainer">
      <header className="header2">
        <Link to={'/'}>
          <img src={logo} alt="EcoGuard Logo" className="logo" />
        </Link>
        <h1>{speciesDetails.scientificName || 'Species Details'}</h1>
      </header>
      
      <main className="mainContent">
        <div className="contentContainer">
          <div className="detailsCard">
            <h2>Details</h2>
            <p><strong>Assessment ID:</strong> {speciesDetails.assessmentId}</p>
            <p><strong>Scientific Name:</strong> {speciesDetails.scientificName || 'Not available'}</p>
            <p><strong>Kingdom:</strong> {speciesDetails.kingdomName || 'Not available'}</p>
            <p><strong>Red List Category:</strong> {speciesDetails.redlistcategory || 'Not available'}</p>
            <p><strong>Population Trend:</strong> {speciesDetails.populationtrend || 'Not available'}</p>
            <p><strong>Habitat:</strong> {speciesDetails.habitat || 'Not available'}</p>
          </div>

          <div className="photoCard">
            <img src={speciesDetails.imageurl} alt="Species" className="speciesImage" />
          </div>

          {speciesDetails.threats && (
            <div className="infoCard">
              <h2>Threats</h2>
              <p>{speciesDetails.threats}</p>
            </div>
          )}

          {speciesDetails.range && (
            <div className="infoCard">
              <h2>Range</h2>
              <p>{speciesDetails.range}</p>
            </div>
          )}
        </div>
      </main>
      <SimpleFooter />
    </div>
  );
};

export default SpeciesDetail;