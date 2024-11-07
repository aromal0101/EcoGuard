import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import './search1.css';
import SimpleFooter from '../../components/SimpleFooter/SimpleFooter';
import logo from '../../assets/ecoguard.png';
import { Link } from 'react-router-dom';

const Search1 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    kingdomName: 'all',
    redlistcategory: 'all',
    populationtrend: 'all',
  });
  const [speciesData, setSpeciesData] = useState([]);
  const [visibleSpecies, setVisibleSpecies] = useState(15);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const fetchSpeciesData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const queryParams = new URLSearchParams({
            kingdomName: filters.kingdomName,
            redlistcategory: filters.redlistcategory,
            populationtrend: filters.populationtrend,
            searchTerm: searchTerm,
          }).toString();
          
          const response = await fetch(`http://localhost:3000/api/species?${queryParams}`);
          if (!response.ok) {
            throw new Error('Failed to fetch species data');
          }
          const data = await response.json();
          setSpeciesData(data);
        } catch (error) {
          console.error('Error fetching species data:', error);
          setError('Failed to load species data. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchSpeciesData();
    }, 500); // 500ms debounce
  
    return () => clearTimeout(timeoutId);
  }, [filters, searchTerm]);
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const loadMoreSpecies = () => {
    setVisibleSpecies((prevVisibleSpecies) => prevVisibleSpecies + 16);
  };

  const filteredSpecies = speciesData.slice(0, visibleSpecies);

  return (
    <div>
      <div className="pageContainer">
        <header className="header1">
          <Link to={'/'}>
            <img src={logo} alt="" className="logo" />
          </Link>
          <div className="searchContainer">
            <Search className="searchIcon" size={20} />
            <input
              type="text"
              placeholder="Search endangered species..."
              value={searchTerm}
              onChange={handleSearch}
              className="searchInput"
            />
          </div>
        </header>

        <div className="mainContent">
          
          <aside className="filterSidebar">
          <h2>Filters</h2>
          <div className="filterGroup">
            <h3>Kingdom name</h3>
            <select onChange={(e) => handleFilterChange('kingdomName', e.target.value)} className="filterSelect">
              <option value="all">All</option>
              <option value="ANIMALIA">Animalia</option>
              <option value="PLANTAE">Plantae</option>
            </select>
          </div>
          <div className="filterGroup">
            <h3>Red list category</h3>
            <select onChange={(e) => handleFilterChange('redlistcategory', e.target.value)} className="filterSelect">
              <option value="all">All</option>
              <option value="Critically Endangered">Critically Endangered</option>
              <option value="Endangered">Endangered</option>
              <option value="Vulnerable">Vulnerable</option>
            </select>
          </div>
          <div className="filterGroup">
            <h3>Population trend</h3>
            <select onChange={(e) => handleFilterChange('populationtrend', e.target.value)} className="filterSelect">
              <option value="all">All</option>
              <option value="Increasing">Increasing</option>
              <option value="Decreasing">Decreasing</option>
              
            </select>
          </div>
        
          </aside>

          <main className="speciesGrid">
            {isLoading && <p>Loading species data...</p>}
            {error && <p className="error-message">{error}</p>}
            {!isLoading && !error && filteredSpecies.length === 0 && (
              <p>No species found matching the current criteria.</p>
            )}
            {filteredSpecies.map((species) => (
              <Link
                to={`/species/${species.assesmentid}`}
                key={species.assesmentid}
                className={`speciesCard ${species.redlistcategory === 'Critically Endangered' ? 'critically-endangered' : ''}`}
              >
                <h2 className="speciesName">{species.scientificName}</h2>
                <p className="speciesDetail"><strong>Kingdom:</strong> {species.kingdomName}</p>
                <p className="speciesDetail"><strong>Status:</strong> {species.redlistcategory}</p>
                <p className="speciesDetail"><strong>Population:</strong> {species.populationtrend}</p>
              </Link>
            ))}
          </main>
        </div>

        {!isLoading && !error && visibleSpecies < speciesData.length && (
          <button onClick={loadMoreSpecies} className="loadMoreButton">Load More</button>
        )}
      </div>
      <SimpleFooter />
    </div>
  );
};

export default Search1;