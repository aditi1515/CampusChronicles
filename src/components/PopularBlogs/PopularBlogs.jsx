import React from 'react'
import { blogs } from '../../utils/temp'
import BlogCard from '../BlogCard/BlogCard'
import './PopularBlogs.scss'
const PopularBlogs = () => {
 return (
  <div className='popular-articles'>
   <h2>Popular Articles</h2>
   <div className="blogs-container">
    {
     blogs.slice(4, 9).map((blog, index) => <BlogCard blog={blog} />)
    }
   </div>
  </div>
 )
}

export default PopularBlogs