import { useSnackbar } from 'notistack'
import React from 'react'
import { blogs } from '../../utils/temp'
import './BlogStatus.scss'
const BlogStatus = () => {
 return (
  <div className='blog-status'>
   <h2>Blog Status</h2>
   <p>All your blogs with pending approval request are listed here.</p>
   <div className="tableWrapper">
    <table>
     <thead>
      <tr>
       <th>Author</th>
       <th>Title</th>
       <th>Status</th>
       <th>Remove</th>
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
  enqueueSnackbar(`This blog  request is removed successfully`, { variant: 'success' })
 }
 const approveBlogRequest = () => {
  enqueueSnackbar(`This blog  request is approved successfully`, { variant: 'success' })
 }
 return (
  <tr className='blog-banner'>
   <td>{blog.author}</td>
   <td>{blog.title.substring(0, 50)}...</td>
   <td>
    {blog.isApproved ? 'Approved' : 'Not Approved'}
   </td>
   <td>
    <button className='deleteBtn' onClick={removeBlogRequest}>Remove</button>
   </td>

  </tr>
 )
}

export default BlogStatus