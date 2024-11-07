import React from 'react'
import './Footer1.css'
import logo from '../../assets/ecoguard.png'
import facebook from '../../assets/facebook_icon.png'
import linkedin from '../../assets/linkedin_icon.png'
import twitter from '../../assets/twitter_icon.png'
import call_icon from '../../assets/call.png'
import mail_icon from '../../assets/mail.png'

const Footer1 = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            
            <div className="footer-content-left">
                <img src={logo} alt="" />
                <p>Thank you for supporting our mission to protect endangered species and preserve biodiversity. Your contributions help us drive impactful conservation efforts, safeguard habitats, and inspire global action. Together, we can create a future where wildlife and ecosystems thrive. Stay connected with us for updates, stories of hope, and ways you can continue making a difference.</p>
                <div className="footer-social-icons">
                    <img src={facebook} alt="" />
                    <img src={twitter} alt="" />
                    <img src={linkedin} alt="" />
                </div>
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li><a href='http://localhost:5173/donation'>Donate</a></li>
                    <li>Privacy policy</li>
                </ul>
                </div>    
            <div className="footer-content-right">
                <h2>CONTACT US</h2>
                <ul>
                    <li><img src={call_icon} alt="" />+11 12131 2113</li>
                    <li><img src={mail_icon} alt="" />ecoguard@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">
            copyright 2024 © International Union for Conservation of Nature and Natural Resources.

        </p>
    </div>
  )
}

export default Footer1