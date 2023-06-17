import React, { useEffect, useState } from 'react'

import { Avatar } from '@mui/material'
import axios from 'axios'

import { useSnackbar } from 'notistack'
import { Link, useNavigate } from 'react-router-dom'
import { useBlogStore } from '../../store/blog.store'
import { useAuthStore } from '../../store/user.store'
import ConfirmDialog from '../../utils/ConfirmDialog'
import { baseURL } from '../../utils/makeRequest'
import { blogs, user } from '../../utils/temp'
import './Dashboard.scss'
const Dashboard = () => {
 const navigate = useNavigate()
 const user = useAuthStore(state => state.user);
 useEffect(() => { if (!user?.isAdmin) navigate('/') }, [user])
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
 const [users, setUsers] = useState([])
 useEffect(() => {
  const getUsers = async () => {
   try {
    const { data } = await axios.get(`${baseURL}/api/auth/admin/getAllUsers`, {
     withCredentials: true
    })
    setUsers(data?.message)
   } catch (error) {
    console.log(error);
   }
  }
  getUsers()
 }, [])
 return (
  <div className='content'>
   <div className="stats">
    <div className="statCard">
     <span>Total Users :</span>
     <span>{users?.length}</span>
    </div>
    <div className="statCard">
     <span>Total Admins :</span>
     <span>{users && users?.filter(user => user.isAdmin)?.length}</span>
    </div>
   </div>
   <div className="dataListing">
    {
     users.map((user, index) => {
      return <UserCard user={user} key={index} setUsers={setUsers} />
     })
    }
   </div>
  </div>
 )
}

const UserCard = ({ user, setUsers }) => {
 const { enqueueSnackbar } = useSnackbar();
 const [changeRoleopen, setChangeRoleOpen] = useState(false)
 const [deleteUserOpen, setDeleteUserOpen] = useState(false)

 const changeUserRole = async () => {
  try {
   const res = await axios.get(`${baseURL}/api/auth/admin/changeUserRole?userId=${user?._id}`, { withCredentials: true })
   if (!res?.data?.success) {
    enqueueSnackbar(res?.data?.message)
    return
   }
   const { data } = await axios.get(`${baseURL}/api/auth/admin/getAllUsers`, {
    withCredentials: true
   })
   setUsers(data?.message)
  } catch (error) {
   console.log(error);
  }
  setChangeRoleOpen(false)
  enqueueSnackbar(`${user.username} is now ${user.isAdmin ? 'user' : 'admin'}`, { variant: 'success' })
 }
 const deleteUser = async () => {
  try {
   const res = await axios.delete(`${baseURL}/api/auth/admin/deleteUser?userId=${user?._id}`, { withCredentials: true })
   if (!res?.data?.success) {
    enqueueSnackbar(res?.data?.message)
    return
   }
   const { data } = await axios.get(`${baseURL}/api/auth/admin/getAllUsers`, {
    withCredentials: true
   })
   setUsers(data?.message)
  } catch (error) {
   console.log(error);
  }
  setDeleteUserOpen(false)
  enqueueSnackbar(`user removed successfully`, { variant: 'success' })
 }
 return (
  <div className='user-card'>
   <img src={user?.avatar?.url} alt="" />
   <div className="detail">
    <span>Name : </span>
    <span>{user?.username}</span>
   </div>
   <div className="detail">
    <span>Profession : </span>
    <span>{user?.profession}</span>
   </div>
   <div className="detail">
    <span>email : </span>
    <span>{user?.email}</span>
   </div>
   <div className="detail">
    <span>Role : </span>
    <span style={{ color: user.isAdmin ? 'red' : 'green' }}>{user.isAdmin ? 'Admin' : 'User'}</span>
   </div>
   <div className="buttons">
    <ConfirmDialog btnText={'Change Role'} open={changeRoleopen} setOpen={setChangeRoleOpen} message={'Are you sure to change the role of this user?'} onAccept={changeUserRole} />
    <ConfirmDialog btnText={'Remove'} open={deleteUserOpen} setOpen={setDeleteUserOpen} message={'Are you sure to delete this user?'} onAccept={deleteUser} />
   </div>
  </div>
 )
}

const BlogsBoard = () => {
 const getAllBlogs = useBlogStore(state => state.getAllBlogs)
 const blogs = useBlogStore(state => state.blogs)

 useEffect(() => {
  const getBlogs = async () => {
   try {
    const { data } = await axios.get(`${baseURL}/api/blog/`, { withCredentials: true });
    getAllBlogs(data?.blogs)
   } catch (error) {
    console.log(error);
   }
  }

  getBlogs()
 }, [])
 return (
  <div className='blogs-board'>
   <div className="stats">
    <div className="statCard">
     <span>Total Blogs :</span>
     <span>{blogs?.length || 0}</span>
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
 const [author, setAuthor] = useState({})
 const getAllBlogs = useBlogStore(state => state.getAllBlogs)
 const [openDelete, setOpenDelete] = useState(false)
 const [openAprrove, setOpenApprove] = useState(false)
 useEffect(() => {
  const getAuthor = async () => {
   try {
    const { data } = await axios.get(`${baseURL}/api/auth/getUserById/${blog?.author}`, { withCredentials: true });
    setAuthor(data?.user);
   } catch (error) {
    console.log(error);
   }
  }
  getAuthor()
 }, [])

 const removeBlogRequest = async () => {
  try {
   await axios.delete(`${baseURL}/api/blog/${blog?._id}`, { withCredentials: true });
   setOpenDelete(false)
   enqueueSnackbar(`This blog request is removed successfully`, { variant: 'success' })

   const { data } = await axios.get(`${baseURL}/api/blog`, { withCredentials: true });

   getAllBlogs(data?.blogs)
  } catch (error) {
   console.log(error);
  }
 }

 return (
  <tr className='blog-banner'>
   <td><Avatar src={author?.avatar?.url} /></td>
   <td><Link to={`/blog/${blog._id}`} style={{ color: 'black' }}>{blog.title.substring(0, 100)}...</Link></td>
   <td>
    <ConfirmDialog open={openDelete} setOpen={setOpenDelete} onAccept={removeBlogRequest} message={"Are you sure to delete this blog?"} btnText={'Delete'} className='deleteBtn' >Remove</ConfirmDialog>
   </td>
   <td>
    <button className='emailBtn'><a href={`mailto:${author?.email}`} className='link'>Email me!</a></button>
   </td>
  </tr>
 )
}

const RequestBoard = () => {

 const getAllBlogs = useBlogStore(state => state.getAllBlogs)
 const blogs = useBlogStore(state => state.blogs)
 useEffect(() => {
  const getBlogs = async () => {
   try {
    const { data } = await axios.get(`${baseURL}/api/blog/getAllUnApprovedBlogs`, { withCredentials: true });

    getAllBlogs(data?.blogs)
   } catch (error) {
    console.log(error);
   }
  }

  getBlogs()
 }, [])
 return (

  <div className='blogs-board'>
   <div className="stats">
    <div className="statCard">
     <span>Total Blogs Requests :</span>
     <span>{blogs?.length || 0}</span>
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
       blogs?.map((blog, idx) => {
        return <RequestBanner blog={blog} key={idx} />
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
 const [author, setAuthor] = useState({})
 const getAllBlogs = useBlogStore(state => state.getAllBlogs)
 const [openDelete, setOpenDelete] = useState(false)
 const [openAprrove, setOpenApprove] = useState(false)
 useEffect(() => {
  const getAuthor = async () => {
   try {
    const { data } = await axios.get(`${baseURL}/api/auth/getUserById/${blog?.author}`, { withCredentials: true });
    setAuthor(data?.user);
   } catch (error) {
    console.log(error);
   }
  }
  getAuthor()
 }, [])

 const removeBlogRequest = async () => {
  try {
   await axios.delete(`${baseURL}/api/blog/${blog?._id}`, { withCredentials: true });
   enqueueSnackbar(`This blog request is removed successfully`, { variant: 'success' })
   setOpenDelete(false)
   const { data } = await axios.get(`${baseURL}/api/blog/getAllUnApprovedBlogs`, { withCredentials: true });

   getAllBlogs(data?.blogs)
  } catch (error) {
   console.log(error);
  }
 }
 const approveBlogRequest = async () => {
  try {
   await axios.put(`${baseURL}/api/blog/${blog?._id}`, {}, { withCredentials: true });
   setOpenApprove(false)
   const { data } = await axios.get(`${baseURL}/api/blog/getAllUnApprovedBlogs`, { withCredentials: true });

   getAllBlogs(data?.blogs)
  } catch (error) {
   console.log(error);
  }
  enqueueSnackbar(`This blog request is approved successfully`, { variant: 'success' })
 }
 return (
  <tr className='blog-banner'>
   <td><Avatar src={author?.avatar?.url} /></td>
   <td>{blog?.title?.substring(0, 50)}...</td>
   <td>
    <ConfirmDialog open={openDelete} setOpen={setOpenDelete} onAccept={removeBlogRequest} message={"Are you sure to remove approval request for this blog?"} btnText={'Delete'} className='deleteBtn' >Remove</ConfirmDialog>
   </td>
   <td>
    <ConfirmDialog open={openAprrove} setOpen={setOpenApprove} onAccept={approveBlogRequest} message={"Are you sure to accept the approval request for this blog?"} btnText={'Approve'} className='deleteBtn'>Remove</ConfirmDialog>
   </td>
  </tr>
 )
}