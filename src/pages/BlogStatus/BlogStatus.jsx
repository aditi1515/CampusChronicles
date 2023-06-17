import axios from 'axios'
import { useSnackbar } from 'notistack'
import React, { useEffect } from 'react'
import { useBlogStore } from '../../store/blog.store'
import { baseURL } from '../../utils/makeRequest'
import './BlogStatus.scss'
const BlogStatus = () => {
 const getAllBlogs = useBlogStore(state => state.getAllBlogs)
 const blogs = useBlogStore(state => state.blogs)
 useEffect(() => {
  const getBlogs = async () => {
   try {
    const { data } = await axios.get(`${baseURL}/api/blog/getMyBlogs`, { withCredentials: true });

    getAllBlogs(data?.myBlogs)
   } catch (error) {
    console.log(error);
   }
  }

  getBlogs()
 }, [])
 return (
  <div className='blog-status'>
   <h2>Blog Status</h2>
   <p>All your blogs with pending approval request are listed here.</p>
   <div className="tableWrapper">
    <table>
     <thead>
      <tr>
       <th>Title</th>
       <th>Status</th>
       {/* <th>Remove</th> */}
      </tr>
     </thead>
     <tbody>
      {
       blogs.map((blog, idx) => {
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

 const removeBlogRequest = () => {
  enqueueSnackbar(`This blog  request is removed successfully`, { variant: 'success' })
 }
 const approveBlogRequest = () => {
  enqueueSnackbar(`This blog  request is approved successfully`, { variant: 'success' })
 }
 return (
  <tr className='blog-banner'>
   <td>{blog.title.substring(0, 50)}...</td>
   <td>
    {blog?.isApproved ? 'Approved' : 'Not Approved'}
   </td>
   <td>
    {/* <button className='deleteBtn' onClick={removeBlogRequest}>Remove</button> */}
   </td>

  </tr>
 )
}

export default BlogStatus