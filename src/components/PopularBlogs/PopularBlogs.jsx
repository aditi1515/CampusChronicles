import React from 'react'
import { Link } from 'react-router-dom'
import { blogs } from '../../utils/temp'
import BlogCard from '../BlogCard/BlogCard'
import './PopularBlogs.scss'
const PopularBlogs = () => {
 let blog1 = blogs[5]
 let blog2 = blogs[6]
 let blog3 = blogs[7]
 let blog4 = blogs[8]
 return (
  <div className='popular-articles'>
   <h2>Popular Articles</h2>
   <div className="blogs-container">
    <div className="left">
     <Link className='link' to={`/blog/${blog1._id}`}>
      <img src={blog1.cover_image} alt="" />
      <div className="details">
       <span>{blog2.category}</span>
       <h3>{blog2.title}</h3>
       <p>{blog2.short_description}</p>
      </div>
     </Link>

    </div>
    <div className="mid">
     <Link className='link' to={`/blog/${blog2._id}`}>
      <img src={blog2.cover_image} alt="" />
      <div className="details">
       <span>{blog2.category}</span>
       <h3>{blog2.title}</h3>
       <p>{blog2.short_description}</p>
      </div>
     </Link>
    </div>
    <div className="right">
     <div className="right-top">
      <Link className='link' to={`/blog/${blog3._id}`}>
       <img src={blog3.cover_image} alt="" />
       <div className="details">
        <span>{blog3.category}</span>
        <h3>{blog3.title}</h3>
        <p>{blog3.short_description}</p>
       </div>
      </Link>
     </div>
     <div className="right-bottom">
      <Link className='link' to={`/blog/${blog4._id}`}>
       <img src={blog4.cover_image} alt="" />
       <div className="details">
        <span>{blog4.category}</span>
        <h3>{blog4.title}</h3>
        <p>{blog4.short_description}</p>
       </div>
      </Link>
     </div>
    </div>
   </div>
  </div>
 )
}

export default PopularBlogs