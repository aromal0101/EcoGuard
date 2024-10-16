// Navbar.jsx
import React, { useEffect, useState } from 'react';
import './Navbar.css';
import Logo from '../../assets/ecoguard.png';
import searchicon from '../../assets/search_icon.png';
import { Link } from 'react-router-dom';

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
                    <button onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                    }}>
                        log out
                    </button>
                ) : (
                    <button onClick={() => setShowLogin(true)}>sign in</button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
