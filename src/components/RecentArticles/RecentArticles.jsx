import React, { useEffect, useState } from 'react'

import BlogCard from '../BlogCard/BlogCard'
import "./RecentArticles.scss"
import axios from 'axios'
import { baseURL } from '../../utils/makeRequest'
const RecentArticles = () => {
 const [blogs,setBlogs] = useState([])
 useEffect(() => {
  const getBlogs = async () => {
   try {
    const { data } = await axios.get(`${baseURL}/api/blog?sortBy=${'createdAt'}`, { withCredentials: true });
    setBlogs(data?.blogs)
   } catch (error) {
    console.log(error);
   }
  }

  getBlogs()
 }, [])
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