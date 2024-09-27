import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home page/Home';
import Cart from './pages/cart/Cart';
import LoginPopup from './components/LoginPopup/Loginpopup'; // Fixed casing
import Footer1 from './components/footer/Footer1';


const App = () => {
  const [showLogin, setShowLogin] = useState(false); // Use parentheses

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin = {setShowLogin}/>: <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
        
      </div>
      <Footer1/>
    </>
  );
}

export default App;
