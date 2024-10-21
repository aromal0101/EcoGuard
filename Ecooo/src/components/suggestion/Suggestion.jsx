import React from 'react'
import './Suggestion.css'
import msg_icon from '../../assets/msg-icon.png'
import mail_icon from '../../assets/mail-icon.png'
import phone_icon from '../../assets/phone-icon.png'
import location_icon from '../../assets/location-icon.png'
import white_arrow from '../../assets/white-arrow.png'

const Suggestion = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "7e77b6d5-9c4b-4a93-88a2-08205a00f5e5");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className='suggestion'>
      <h2>Suggestion</h2>
      <div className='contact'>
        <div className="contact-col">
          <h3>send a message <img src={msg_icon} alt="" /></h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas atque rerum odit, ipsam soluta, facilis a saepe accusantium accusamus quae eaque, quam aspernatur alias quia exercitationem labore dolor excepturi fugit.</p>
          <ul>
            <li><img src={mail_icon} alt="" /> contact@eduline.dev</li>
            <li><img src={phone_icon} alt="" /> 2323 23232 23 232</li>
            <li><img src={location_icon} alt="" /> usa</li>
          </ul>
        </div>
        <div className="contact-col">
          <form onSubmit={onSubmit}>
            <label>your name</label>
            <input type="text" name='name' placeholder='Enter your name' required />
            <label>phone number</label>
            <input type="text" name='phone' placeholder='Enter your mobile number' required />
            <label>write the message</label>
            <textarea name="message" rows="6" placeholder='enter your message' required></textarea>
            <button type='submit' className='btn dark-btn'>submit now <img src={white_arrow} alt="" /></button>
          </form>
          <span>{result}</span>
        </div>
      </div>
    </div>
  )
}

export default Suggestion;