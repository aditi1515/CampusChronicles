import axios from 'axios'
import React from 'react'
import { IoIosNotifications } from 'react-icons/io'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/user.store'
import { baseURL } from '../../utils/makeRequest'
import { user } from '../../utils/temp'
import './Navbar.scss'
import logo from '../../assets/videos/logoAnimation.mp4'
import logoImg from '../../assets/images/logo.png'
import CreateIcon from '@mui/icons-material/Create';
const Navbar = () => {
 const location = useLocation()

 const { user, isAuthenticated, logoutUser } = useAuthStore(state => state)

 const logout = async () => {
  try {
   const { data } = await axios.get(`${baseURL}/api/auth/logout`, {
    withCredentials: true,
   });
   if (data.success) {
    logoutUser()
   }
   else {
    // user not present / token expired
   }
  } catch (error) {
   console.log(error);
  }
 }

 return (
  <nav>
   <div className="main">
    <div className="logo">
     {/* <video muted autoPlay loop src={logo}></video> */}
     <img src={logoImg} alt="logo" />
    </div>
    <div className="nav-links">
     <ul>
      <li className={location.pathname === '/' && 'selected'}><Link className='link' to={'/'}>Home</Link></li>
      <li className={location.pathname === '/blogs' && 'selected'}><Link className='link' to={'/blogs'}>Blogs</Link></li>
      {user?.isAdmin && <li className={location.pathname === '/dashboard' && 'selected'}><Link className='link' to={'/dashboard'}>DashBoard</Link></li>}
      {isAuthenticated && <li className={location.pathname === '/blogs' && 'selected'}><Link className='link' to={'/blog/create'}><CreateIcon/></Link></li>}
     </ul>
    </div>

    <div className="auth">
     {!isAuthenticated ? (
      <div className="auth-container">
       <IoIosNotifications />
       <button><Link className='link' to={'/login'}>Log In</Link></button>
       <button className='signUp'><Link className='link' to={'/register'}>Sign Up</Link></button>
      </div>
     ) : (
      <div className="auth-container">
       <Link className='link' to={'/blogs-status'}><IoIosNotifications style={{ fontSize: '1.5rem' }} /></Link>
       <button style={{ border: '2px solid' }} onClick={logout}>Logout</button>
       <div>
        <img src={user?.avatar?.url} alt="" />
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
     {user?.isAdmin && <li className={location.pathname === '/dashboard' && 'selected'}><Link className='link' to={'/dashboard'}>DashBoard</Link></li>}
     {isAuthenticated && <li className={location.pathname === '/blogs' && 'selected'}><Link className='link' to={'/blog/create'}><CreateIcon/></Link></li>}
    </ul>
   </div>
   <hr />
  </nav>
 )
}

export default Navbar