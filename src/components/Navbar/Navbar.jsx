import React from 'react'
import { IoIosNotifications } from 'react-icons/io'
import { Link, useLocation } from 'react-router-dom'
import { user } from '../../utils/temp'
import './Navbar.scss'
const Navbar = () => {
 const location = useLocation()

 return (
  <nav>
   <div className="main">
    <div className="logo">Logo</div>
    <div className="nav-links">
     <ul>
      <li className={location.pathname === '/' && 'selected'}><Link className='link' to={'/'}>Home</Link></li>
      <li className={location.pathname === '/blogs' && 'selected'}><Link className='link' to={'/blogs'}>Blogs</Link></li>
      {user.isAdmin && <li className={location.pathname === '/dashboard' && 'selected'}><Link className='link' to={'/dashboard'}>DashBoard</Link></li>}
     </ul>
    </div>
    
    <div className="auth">
     {!user.isAuthenticated ? (
      <div className="auth-container">
       <IoIosNotifications />
       <button>Log In</button>
       <button className='signUp'>Sign Up</button>
      </div>
     ) : (
      <div className="auth-container">
       <Link className='link' to={'/blogs-status'}><IoIosNotifications style={{fontSize:'1.5rem'}}  /></Link>
       <button style={{ border: '2px solid' }}>Logout</button>
       <div>
        <img src={user.profile.avatar} alt="" />
       </div>
      </div>
     )}
    </div>
   </div>
   <hr />
   <div className="nav-links-responsive">
    <ul>
     <li className={location.pathname === '/' && 'selected'}><Link className='link' to={'/'}>Home</Link></li>
     <li className={location.pathname === '/blogs' && 'selected'}><Link className='link' to={'/blogs'}>Blogs</Link></li>
     {user.isAdmin && <li className={location.pathname === '/dashboard' && 'selected'}><Link className='link' to={'/dashboard'}>DashBoard</Link></li>}
    </ul>
   </div>
   <hr />
  </nav>
 )
}

export default Navbar