import React from 'react'
import { blogs } from '../../utils/temp'
import BlogCard from '../BlogCard/BlogCard'
import "./RecentArticles.scss"
const RecentArticles = () => {
 return (
  <div className='recent-articles'>
   <h2>Recent Articles</h2>
   <div className="blogs-container">
    {
     blogs.slice(0,5).map((blog, index) => <BlogCard blog={blog} />)
    }
   </div>
  </div>
 )
}

export default RecentArticles