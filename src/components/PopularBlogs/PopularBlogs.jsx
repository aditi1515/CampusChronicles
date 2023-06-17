import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './PopularBlogs.scss'
import axios from 'axios'
import { baseURL } from '../../utils/makeRequest'
const PopularBlogs = () => {
 const [blogs,setBlogs] = useState([])
 useEffect(() => {
  const getBlogs = async () => {
   try {
    const { data } = await axios.get(`${baseURL}/api/blog?sortBy=${'likes'}`, { withCredentials: true });
    setBlogs(data?.blogs)
   } catch (error) {
    console.log(error);
   }
  }

  getBlogs()
 }, [])

 const blog1 = blogs[0];
 const blog2 = blogs[1];
 const blog3 = blogs[2];
 const blog4 = blogs[3];
 return (
  <div className='popular-articles'>
   <h2>Popular Articles</h2>
   <div className="blogs-container">
    <div className="left">
     <Link className='link' to={`/blog/${blog1?._id}`}>
      <img src={blog1?.cover_image?.url} alt="" />
      <div className="details">
       <span>{blog1?.category}</span>
       <h3>{blog1?.title}</h3>
       <p>{blog1?.shortDescription}</p>
      </div>
     </Link>

    </div>
    <div className="mid">
     <Link className='link' to={`/blog/${blog2?._id}`}>
      <img src={blog2?.cover_image?.url} alt="" />
      <div className="details">
       <span>{blog2?.category}</span>
       <h3>{blog2?.title}</h3>
       <p>{blog2?.shortDescription}</p>
      </div>
     </Link>
    </div>
    <div className="right">
     <div className="right-top">
      <Link className='link' to={`/blog/${blog3?._id}`}>
       <img src={blog3?.cover_image?.url} alt="" />
       <div className="details">
        <span>{blog3?.category}</span>
        <h3>{blog3?.title}</h3>
        <p>{blog3?.shortDescription}</p>
       </div>
      </Link>
     </div>
     <div className="right-bottom">
      <Link className='link' to={`/blog/${blog4?._id}`}>
       <img src={blog4?.cover_image?.url} alt="" />
       <div className="details">
        <span>{blog4?.category}</span>
        <h3>{blog4?.title}</h3>
        <p>{blog4?.shortDescription}</p>
       </div>
      </Link>
     </div>
    </div>
   </div>
  </div>
 )
}

export default PopularBlogs