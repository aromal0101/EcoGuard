import React, { useEffect, useState } from 'react';
import './Loginpopup.css';
import cross from '../../assets/cross_icon.png';
import axios from 'axios';

const Loginpopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currState === "Sign Up") {
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        console.log('Attempting to register:', { name, email });
        const response = await axios.post('http://localhost:3000/api/register', { name, email, password });
        console.log('Registration response:', response.data);
        alert(response.data.message || 'Account created successfully');
        localStorage.setItem("user", name);
        setShowLogin(false);
      } else {
        const email = e.target[0].value;
        const password = e.target[1].value;
        console.log('Attempting to login:', { email });
        const response = await axios.post('http://localhost:3000/api/login', { email, password });
        console.log('Login response:', response.data);
        alert(response.data.message || 'Logged in successfully');
        localStorage.setItem("user", email);
        setShowLogin(false);
      }
      window.location.reload();
    } catch (error) {
      console.error('Error details:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(`Error: ${error.response.data.message || 'An error occurred'}`);
      } else if (error.request) {
        console.error('No response received');
        alert('No response from server. Please try again later.');
      } else {
        console.error('Unexpected error:', error.message);
        alert('An unexpected error occurred: ' + error.message);
      }
    }
  };
  

  return (
    <div className='login-popup'>
      <form className='login-popup-container' onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={cross} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && <input type="text" placeholder='your name' required />}
          <input type="email" placeholder='your email' required />
          <input type="password" placeholder='password' required />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  );
};

export default Loginpopup;