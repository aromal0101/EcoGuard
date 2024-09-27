import React, { useState } from 'react';
import './Navbar.css';
import Logo from '../../assets/ecoguard.png';
import searchicon from '../../assets/search_icon.png';

const Navbar = ({setShowLogin}) => {
    const [menu, setMenu] = useState("home"); // Initialize with "home"

    const handleMenuClick = (menuItem) => {
        setMenu(menuItem);
    };

    return (
        <div className='navbar'>
            <img src={Logo} alt="Logo" className='logo' />
             <ul className='navbar-menu'>
                <li className={menu === "home" ? "active" : ""} onClick={() => handleMenuClick("home")}>home</li>
                
                <li className={menu === "Suggestions" ? "active" : ""} onClick={() => handleMenuClick("Suggestions")}>contact us</li>
            </ul>
            <div className="navbar-right">
                <img src={searchicon} alt="Search" />
                <button onClick={()=>setShowLogin(true)}>sign in</button>
            </div>
        </div>
        
    );
}

export default Navbar;
