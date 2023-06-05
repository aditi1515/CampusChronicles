import React, { useState } from 'react'

import { useSnackbar } from 'notistack'
import { Link } from 'react-router-dom'
import { blogs, user } from '../../utils/temp'
import './Dashboard.scss'
const Dashboard = () => {
 const [tabSelected, setTabSelected] = useState(1)
 return (
  <div className='dashboard'>
   <h1>DashBoard</h1>
   <div className="main">
    <div className="sidebar">
     <ul>
      <li className={tabSelected === 1 && 'active'} onClick={() => setTabSelected(1)}>Users</li>
      <li className={tabSelected === 2 && 'active'} onClick={() => setTabSelected(2)}>Blogs</li>
      <li className={tabSelected === 3 && 'active'} onClick={() => setTabSelected(3)}>Request</li>
     </ul>
    </div>

    {
     tabSelected === 1 ? <UsersBoard /> : tabSelected === 2 ? <BlogsBoard /> : <RequestBoard />
    }

   </div>
  </div>
 )
}

export default Dashboard

const UsersBoard = () => {
 return (
  <div className='content'>
   <div className="stats">
    <div className="statCard">
     <span>Total Users :</span>
     <span>{28}</span>
    </div>
    <div className="statCard">
     <span>Total Admins :</span>
     <span>{3}</span>
    </div>
   </div>
   <div className="dataListing">
    {
     [...Array(10)].map((_, index) => {
      return <UserCard user={user} key={index} />
     })
    }
   </div>
  </div>
 )
}

const UserCard = ({ user }) => {
 const { enqueueSnackbar } = useSnackbar();

 const changeUserRole = () => {
  enqueueSnackbar(`${user.fullname} is now ${user.isAdmin ? 'user' : 'admin'}`, { variant: 'success' })
 }
 const deleteUser = () => {
  enqueueSnackbar(`${user.fullname} is removed successfully`, { variant: 'success' })
 }
 return (
  <div className='user-card'>
   <img src={user.profile.avatar} alt="" />
   <div className="detail">
    <span>Name : </span>
    <span>{user.fullname}</span>
   </div>
   <div className="detail">
    <span>Profession : </span>
    <span>{user.profession}</span>
   </div>
   <div className="detail">
    <span>email : </span>
    <span>{user.email}</span>
   </div>
   <div className="detail">
    <span>Role : </span>
    <span style={{ color: user.isAdmin ? 'red' : 'green' }}>{user.isAdmin ? 'Admin' : 'User'}</span>
   </div>
   <div className="buttons">
    <button onClick={changeUserRole}>Change Role</button>
    <button onClick={deleteUser}>Remove</button>
   </div>
  </div>
 )
}

const BlogsBoard = () => {
 return (
  <div className='blogs-board'>
   <div className="stats">
    <div className="statCard">
     <span>Total Blogs :</span>
     <span>{28}</span>
    </div>
   </div>
   <div className="blogs-banner-container">
    <table>
     <thead>
      <tr>
       <th>Author</th>
       <th>Title</th>
       <th>Delete</th>
       <th>Email</th>
      </tr>
     </thead>
     <tbody>
      {
       blogs.map((blog, idx) => {
        if (blog.isApproved) return <BlogBanner blog={blog} key={idx} />
       })
      }
     </tbody>
    </table>
   </div>
  </div>
 )
}

const BlogBanner = ({ blog }) => {
 const { enqueueSnackbar } = useSnackbar();

 const deleteBlog = () => {
  enqueueSnackbar(`This blog is deleted successfully`, { variant: 'success' })
 }
 return (
  <tr className='blog-banner'>
   <td>{blog.author}</td>
   <td><Link to={`/blog/${blog._id}`} style={{ color: 'black' }}>{blog.title.substring(0, 100)}...</Link></td>
   <td>
    <button className='deleteBtn' onClick={deleteBlog}>Delete</button>
   </td>
   <td>
    <button className='emailBtn'><a href={`mailto:${blog.authorEmail}`} className='link'>Email me!</a></button>
   </td>
  </tr>
 )
}

const RequestBoard = () => {
 return (

  <div className='blogs-board'>
   <div className="stats">
    <div className="statCard">
     <span>Total Blogs Requests :</span>
     <span>{28}</span>
    </div>
   </div>
   <div className="blogs-banner-container">
    <table>
     <thead>
      <tr>
       <th>Author</th>
       <th>Title</th>
       <th>Remove</th>
       <th>Action</th>
      </tr>
     </thead>
     <tbody>
      {
       blogs.map((blog, idx) => {
        if (!blog.isApproved) return <RequestBanner blog={blog} key={idx} />
       })
      }
     </tbody>
    </table>
   </div>
  </div>
 )
}

const RequestBanner = ({ blog }) => {
 const { enqueueSnackbar } = useSnackbar();

 const removeBlogRequest = () => {
  enqueueSnackbar(`This blog request is removed successfully`, { variant: 'success' })
 }
 const approveBlogRequest = () => {
  enqueueSnackbar(`This blog request is approved successfully`, { variant: 'success' })
 }
 return (
  <tr className='blog-banner'>
   <td>{blog.author}</td>
   <td>{blog.title.substring(0, 50)}...</td>
   <td>
    <button className='deleteBtn' onClick={removeBlogRequest}>Remove</button>
   </td>
   <td>
    <button className='emailBtn' onClick={approveBlogRequest}>Approve</button>
   </td>
  </tr>
 )
}