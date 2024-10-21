// Home.jsx
import React, { useRef, useState } from 'react';
import './Home.css';
import Header from '../../components/header/Header';
import Partnership from '../../components/partnership/Partnership';
import News from '../../components/news/News';
import Navbar from '../../components/navbar/Navbar'; // Import the Navbar
import Footer1 from '../../components/footer/Footer1'
import Loginpopup from '../../components/LoginPopup/Loginpopup';
import Suggestion from '../../components/suggestion/Suggestion';

const Home = () => {
  const headerRef = useRef(null); // Ref for header section
  const newsRef = useRef(null);   // Ref for news section
  const partnershipRef = useRef(null); // Ref for partnership section
  const suggestionsRef = useRef(null); // Ref for suggestions section (if you have one)
  const [showLogin, setShowLogin] = useState(false); 
  // Scroll to the section referenced
  const scrollToSection = (refName) => {
    if (refName === 'headerRef' && headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (refName === 'newsRef' && newsRef.current) {
      newsRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (refName === 'partnershipRef' && partnershipRef.current) {
      partnershipRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (refName === 'suggestionsRef' && suggestionsRef.current) {
      suggestionsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      
       {showLogin ? <Loginpopup setShowLogin = {setShowLogin}/>: <></>}
      {/* Pass the scrollToSection function to Navbar */}
      <Navbar setShowLogin={setShowLogin} scrollToSection={scrollToSection} />
      
      <div ref={headerRef} className="header-section">
        <Header />
      </div>
      <div ref={newsRef} className="news-section">
        <News />
      </div>
      <div ref={partnershipRef} className="partnership-section">
        <Partnership />
      </div>
      <div ref={suggestionsRef} className="partnership-section">
        <Suggestion/>
      </div>
      <div>
        <Footer1 />
      </div>
    </div>
  );
};

export default Home;
