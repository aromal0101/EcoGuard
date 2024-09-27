import React from 'react'
import './Partnership.css'
import biopark_logo from '../../assets/BioPark.jpg'
import iucn_logo from '../../assets/iucn.jpg'
import ssc_logo from '../../assets/ssc-logo.png'
import zsl_logo from '../../assets/ZSL_logo.jpg'
import cint_logo from '../../assets/CINT.png'

const Partnership = () => {
  return (
    <div className='partnership' id='partnership'>
        <p>the Ecoguard partners</p>
        <div className="partnercontent">
            <img src={biopark_logo} alt="" />
            <img src={iucn_logo} alt="" />
            <img src={ssc_logo} alt="" />
            <img src={zsl_logo} alt="" />
            <img src={cint_logo} alt="" />
        </div>
    </div>
  )
}

export default Partnership