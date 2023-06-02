import React from 'react'
import coin from '../../assets/images/coin.png'
import './Banner.scss'
const Banner = () => {
 return (
  <div className='banner'>
   <div className="left">
    <h4>WELCOME TO CHRONICLES</h4>
    <h2><span>Bridging</span> the Gap Between Students and College Life</h2>
    <button>
     Create Blog
    </button>
   </div>
   {/* <div className="right">
    <img src={coin} alt="" />
   </div> */}
  </div>
 )
}

export default Banner