import React, { useEffect, useState } from 'react'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import axios from 'axios'
import { baseURL } from '../../utils/makeRequest'
import BlogCard from '../BlogCard/BlogCard'
import "./RecentArticles.scss"
const RecentArticles = () => {
 const [blogs, setBlogs] = useState([])

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
    <Splide aria-label="My Favorite Images" options={{
     rewind: true,
     width: '100%',
     fixedWidth : '25rem',
     gap: '1rem',
    }}
    >

     {
      blogs.slice(0, 5).map((blog, index) => {
       return (
        <SplideSlide>
         <BlogCard blog={blog} />
        </SplideSlide>
       )
      }
      )
     }
    </Splide>
   </div>
  </div>
 )
}

export default RecentArticles