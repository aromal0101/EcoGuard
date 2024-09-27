import React, { useState } from 'react'
import './Loginpopup.css'
import cross from '../../assets/cross_icon.png'

const Loginpopup = ({setShowLogin}) => {

    const [currState,setCurrState] = useState("Sign Up")

  return (
    <div className='login-popup'>
        <form className='login-popup-container'>
           <div className="login-popup-title">
            <h2>
                {currState}
            </h2>
            <img onClick={()=>setShowLogin(false)} src={cross} alt="" />
            </div> 
            <div className="login-popup-inputs">
                {currState==="Login" ? <></>: <input type="text" placeholder='your name' required />}
               
                <input type="email" placeholder='your email' required />
                <input type="password" placeholder='password' required />
            </div>
            <button>{currState==="Sign up" ? "create account" : "login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>
            {currState==="Login"
            ?<p>create a new account? <span onClick={()=>setCurrState("Sign up")}>Click here</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>login here</span></p>
            }
            
            
            </form>
    </div>
  )
}

export default Loginpopup