import React from 'react'
import linkedin from '../../assets/images/linkedin.png'
import './Footer.scss'
import logo from '../../assets/images/logo.png'
const Footer = () => {

 return (
  <div className='footer'>
   <div className='logo'>
    <img src={logo} alt="" />
   </div>
   <h5>It's not about perfect. It's about effort.</h5>
   <hr />
   <div className='footer-bottom'>
    <p>© {Date().split(' ')[3]} Delhi , India . All rights reserved.</p>
    <div className="footer-links">
     <div><a className='link' target='_blank' href="https://www.linkedin.com/in/jatinpandey26/"><img src={linkedin} alt="" /> <span>Jatin Pandey</span></a></div>
     <div><a className='link' target='_blank' href="https://www.linkedin.com/in/aditi-gemini/"><img src={linkedin} alt="" /> <span>Aditi Gemini</span></a></div>
    </div>
   </div>
  </div>
 )
}

export default Footer