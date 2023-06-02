import React from 'react'
import { blogs } from '../../utils/temp'
import BlogCard from '../BlogCard/BlogCard'
import './PopularBlogs.scss'
const PopularBlogs = () => {
 return (
  <div className='popular-articles'>
   <h2>Popular Articles</h2>
   <div className="blogs-container">
    <div className="left"></div>
    <div className="mid"></div>
    <div className="right">
     <div className="right-top"></div>
     <div className="right-bottom"></div>
    </div>
   </div>
  </div>
 )
}

export default PopularBlogs