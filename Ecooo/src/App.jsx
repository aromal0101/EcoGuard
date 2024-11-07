// App.jsx
import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home page/Home';
import SearchPage from './pages/searchPage/search1';
import SpeciesDetail from './pages/details page/SpeciesDetail';
import DonationPage from './pages/donation/Donation';


const App = () => {
  const headerRef = useRef(null);
  const newsRef = useRef(null);
  const partnershipRef = useRef(null);

  const scrollToSection = (section) => {
    if (section === 'headerRef' && headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'newsRef' && newsRef.current) {
      newsRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'partnershipRef' && partnershipRef.current) {
      partnershipRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home headerRef={headerRef} newsRef={newsRef} partnershipRef={partnershipRef} />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/species/:assessmentId" element={<SpeciesDetail />} />
        <Route path="/donation" element={<DonationPage/>}/>
      </Routes>
      </div>
  );
}

export default App;
