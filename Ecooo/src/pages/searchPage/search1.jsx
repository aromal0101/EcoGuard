import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import './search1.css';
import SimpleFooter from '../../components/SimpleFooter/SimpleFooter';
import logo from '../../assets/ecoguard.png';
import { Link } from 'react-router-dom';

const search1 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    habitat: 'all',
  });
  const [speciesData, setSpeciesData] = useState([]);
  const [visibleSpecies, setVisibleSpecies] = useState(15);
  

  // Fetch species data from the backend
  useEffect(() => {
    const fetchSpeciesData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/species?type=${filters.type}&status=${filters.status}&habitat=${filters.habitat}&searchTerm=${searchTerm}`);
        const data = await response.json();
        setSpeciesData(data);
      } catch (error) {
        console.error('Error fetching species data:', error);
      }
    };

    fetchSpeciesData();
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
            <h3>Type</h3>
            <select onChange={(e) => handleFilterChange('type', e.target.value)} className="filterSelect">
              <option value="all">All</option>
              <option value="Animal">Animal</option>
              <option value="Plant">Plant</option>
            </select>
          </div>
          <div className="filterGroup">
            <h3>Status</h3>
            <select onChange={(e) => handleFilterChange('status', e.target.value)} className="filterSelect">
              <option value="all">All</option>
              <option value="Critically Endangered">Critically Endangered</option>
              <option value="Endangered">Endangered</option>
              <option value="Vulnerable">Vulnerable</option>
            </select>
          </div>
          <div className="filterGroup">
            <h3>Habitat</h3>
            <select onChange={(e) => handleFilterChange('habitat', e.target.value)} className="filterSelect">
              <option value="all">All</option>
              <option value="Temperate Forest">Temperate Forest</option>
              <option value="Tropical Rainforest">Tropical Rainforest</option>
              <option value="Grassland">Grassland</option>
              <option value="Marine">Marine</option>
              <option value="Various">Various</option>
              <option value="Wetlands">Wetlands</option>
            </select>
          </div>
        </aside>

        <main className="speciesGrid">
          {filteredSpecies.map((species) => (
            <Link
              to={`/species/${species.id}`} // Link to the detail page
              key={species.id}
              className={`speciesCard ${species.status === 'Critically Endangered' ? 'critically-endangered' : ''}`}
            >
              <h2 className="speciesName">{species.name}</h2>
              <p className="speciesDetail"><strong>Type:</strong> {species.type}</p>
              <p className="speciesDetail"><strong>Status:</strong> {species.status}</p>
              <p className="speciesDetail"><strong>Population:</strong> {species.population}</p>
              <p className="speciesDetail"><strong>Habitat:</strong> {species.habitat}</p>
            </Link>
          ))}
        </main>
      </div>

      {visibleSpecies < speciesData.length && (
        <button onClick={loadMoreSpecies} className="loadMoreButton">Load More</button>
      )}

      
    </div>
    <SimpleFooter />
    </div>
  );
};

export default search1;