import React from 'react'
import { user } from '../../utils/temp'
import './Navbar.scss'
const Navbar = () => {
 return (
  <nav>
   <div className="logo">Logo</div>
   <div className="nav-links">
    <ul>
     <li>Home</li>
     <li>Blogs</li>
     {user.isAdmin && <li>DashBoard</li>}
    </ul>
   </div>
   <div className="auth">
    {!user.isAuthenticated ? (
     <div className="auth-container">
      <button>Log In</button>
      <button className='signUp'>Sign Up</button>
     </div>
    ) : (
     <div className="auth-container">
      <button style={{border : '2px solid'}}>Logout</button>
      <div>
       <img src={user.profile.avatar} alt="" />
      </div>
     </div>
    )}
   </div>
  </nav>
 )
}

export default Navbar