// Navbar.jsx
import React, { useEffect, useState } from 'react';
import './Navbar.css';
import Logo from '../../assets/ecoguard.png';
import searchicon from '../../assets/search_icon.png';
import { Link } from 'react-router-dom';
import Profile from '../../assets/profile_icon.png';
import logout from '../../assets/logout_icon.png';


const Navbar = ({ setShowLogin, scrollToSection }) => {
    const [menu, setMenu] = useState("home"); // Initialize with "home"
    const [login, setLogin] = useState(false);

    const handleMenuClick = (menuItem, ref) => {
        setMenu(menuItem);
        scrollToSection(ref); // Scroll when menu is clicked
    };

    useEffect(() => {
        const hello = localStorage.getItem("user");
        if (hello) {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, []);

    return (
        <div className='navbar'>
            <img src={Logo} alt="Logo" className='logo' />
            <ul className='navbar-menu'>
                <li className={menu === "home" ? "active" : ""} onClick={() => handleMenuClick("home", 'headerRef')}>home</li>
                <li className={menu === "news" ? "active" : ""} onClick={() => handleMenuClick("news", 'newsRef')}>news</li>
                <li className={menu === "partners" ? "active" : ""} onClick={() => handleMenuClick("partners", 'partnershipRef')}>partners</li>
                <li className={menu === "Suggestions" ? "active" : ""} onClick={() => handleMenuClick("Suggestions", 'suggestionsRef')}>Suggestions</li>
            </ul>
            <div className="navbar-right">
                <Link to={"/search"}>
                    <img src={searchicon} alt="Search" style={{ cursor: 'pointer' }} />
                </Link>
                
                {login ? (
                    <div className="navbar-profile">
                        <img src={Profile}/>
                        <ul className='nav-profile-dropdown'>
                            <li onClick={() => {
                                localStorage.clear();
                                window.location.reload();
                                 }}>
                                 <img src={logout}/><p>logout</p></li>
                        </ul>


                    </div>
                  
                ) : (
                    <button onClick={() => setShowLogin(true)}>sign in</button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
