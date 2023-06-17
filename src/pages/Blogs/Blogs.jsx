import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import Select from 'react-select'
import BlogCard from '../../components/BlogCard/BlogCard'
import { useBlogStore } from '../../store/blog.store'
import { baseURL } from '../../utils/makeRequest'
import './Blogs.scss'
const Blogs = () => {
 const [blogs, setBlogs] = useState([])
 const [category, setCategory] = useState('')
 const [sortBy, setSortBy] = useState('Newest')
 const [search, setSearch] = useState('')

 const getAllBlogs = useBlogStore(state => state.getAllBlogs)

 useEffect(() => {
  const getBlogs = async () => {
   try {
    const { data } = await axios.get(`${baseURL}/api/blog?search=${search}&&category=${category}&&sortBy=${sortBy === 'Newest' ? 'createdAt' : 'likes'}`, { withCredentials: true });
    setBlogs(data?.blogs)
    getAllBlogs(data?.blogs)
   } catch (error) {
    console.log(error);
   }
  }

  getBlogs()
 }, [search, category, sortBy])

 const categoryOptions = [

  { value: '', label: 'All' },
  { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
  { value: 'Software Development', label: 'Software Development' },
  { value: 'Web Development', label: 'Web Development' },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'Internet of Things', label: 'Internet of Things' },
  { value: 'Machine Learning', label: 'Machine Learning' },
  { value: 'Robotics', label: 'Robotics' },
  { value: 'Virtual Reality', label: 'Virtual Reality' },
  { value: 'Augmented Reality', label: 'Augmented Reality' },
  { value: 'Mobile App Development', label: 'Mobile App Development' },
  { value: 'Network Security', label: 'Network Security' },
  { value: 'Cloud Computing', label: 'Cloud Computing' },
  { value: 'Blockchain Technology', label: 'Blockchain Technology' },
  { value: 'UI/UX Design', label: 'UI/UX Design' }
 ]
 const blogSortOptions = [
  { label: 'Popular', value: 'popular' },
  { label: 'Newest', value: 'newest' },
 ]
 const handleCategoryChange = (e) => {
  setCategory(e.value)
 }
 const handleSortChange = (e) => {
  setSortBy(e.value)
 }

 const handleSearch = (e) => {
  setSearch(e.target.value)
 }
 return (
  <div className='blogs-wrapper'>
   <div className="heading">
    <h2>Blogs</h2>
   </div>
   <div className="main">
    <div className="filter-options">
     <div className="left">
      <div className="select-container">
       <span>Category</span>
       <Select
        className='select-category'
        options={categoryOptions}
        onChange={handleCategoryChange}

       />
      </div>
      <div className="select-container">
       <span>Sort By</span>
       <Select
        className='select-sort'
        options={blogSortOptions}
        onChange={handleSortChange}
       />

      </div></div>
     <div class="wrap">
      <div class="search">
       <input type="text" class="searchTerm" onChange={handleSearch} placeholder="What are you looking for?" />
       <button type="submit" class="searchButton">
        <AiOutlineSearch />
       </button>
      </div>
     </div>

    </div>
    <div className="blog-container">
     {
      blogs.map((blog, idx) => <BlogCard blog={blog} key={idx} />)
     }
    </div>
   </div>
  </div>
 )
}

export default Blogs