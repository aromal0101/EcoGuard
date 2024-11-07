import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SimpleFooter from '../../components/SimpleFooter/SimpleFooter';
import logo from '../../assets/ecoguard.png';
import './SpeciesDetail.css';

const SpeciesDetail = () => {
  const {assesmentid} = useParams();
  const [speciesDetails, setSpeciesDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeciesDetails = async () => {
      try {
        
        console.log('Fetching species with assesmentid:', assesmentid);
        const response = await fetch(`http://localhost:3000/api/species/${assesmentid}`);
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

    if (assesmentid) {
      fetchSpeciesDetails();
    }
  }, [assesmentid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!speciesDetails) {
    return <div>No species found for assesmentid: {assesmentid}</div>;
  }

  return (
    <div>
      <div className="speciesDetailsContainer">
        <header className="header2">
          <Link to={'/'}>
            <img src={logo} alt="EcoGuard Logo" className="logo" />
          </Link>
          <h1>{speciesDetails.scientificName || 'Species Details'}</h1>
        </header>
        <main className="speciesDetailsContent">
          <div className="detailsCard">
            <h2>Details</h2>
            <p><strong>Assessment ID:</strong> {speciesDetails.assesmentid}</p>
            <p><strong>Scientific Name:</strong> {speciesDetails.scientificName || 'Not available'}</p>
            <p><strong>Kingdom:</strong> {speciesDetails.kingdomName || 'Not available'}</p>
            <p><strong>Red List Category:</strong> {speciesDetails.redlistcategory || 'Not available'}</p>
            <p><strong>Population Trend:</strong> {speciesDetails.populationtrend || 'Not available'}</p>
            <p><strong>Habitat:</strong> {speciesDetails.habitat || 'Not available'}</p>
          </div>
          {speciesDetails.threats && (
            <div className="threatsCard">
              <h2>Threats</h2>
              <p>{speciesDetails.threats}</p>
            </div>
          )}
        </main>
      </div>
      <SimpleFooter />
    </div>
  );
};

export default SpeciesDetail;