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
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores autem culpa, id aliquam minima quisquam a laboriosam omnis, nam dignissimos qui accusamus dolorum! Nulla error voluptates nemo quos reprehenderit rerum?</p>
                <div className="footer-social-icons">
                    <img src={facebook} alt="" />
                    <img src={twitter} alt="" />
                    <img src={linkedin} alt="" />
                </div>
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>home</li>
                    <li>About us</li>
                    <li>privacy policy</li>
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