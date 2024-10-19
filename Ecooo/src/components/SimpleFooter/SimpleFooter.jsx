import React from 'react';
import './SimpleFooter.css'; // New CSS file

const SimpleFooter = () => {
  return (
    <div className='simple-footer' id='simple-footer'>
      <hr />
      <p className="footer-copyright">
        copyright 2024 © International Union for Conservation of Nature and Natural Resources.
      </p>
    </div>
  );
}

export default SimpleFooter;
