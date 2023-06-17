import React from 'react'
import { Link } from 'react-router-dom'
import dog from '../../assets/images/dog.jfif'
import './Page404.scss'
const Page404 = () => {
  return (
    <div className='Wrapper404'>
      <h1>404</h1>
      <img src={dog} alt="not found" />
      <h2>Page Not Found</h2>
      <span><Link className='link' to={'/'}>Continue to Home page</Link></span>
    </div>
  )
}

export default Page404