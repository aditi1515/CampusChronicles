import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import Select from 'react-select'
import BlogCard from '../../components/BlogCard/BlogCard'
import { blogs } from '../../utils/temp'
import './Blogs.scss'
const Blogs = () => {
 const categoryOptions = [
  { label: 'All', value: '' },
  { label: 'Technology', value: 'technology' },
  { label: 'Artificial Intelligence', value: 'artificial-intelligence' },
  { label: 'Web Development', value: 'web-development' },
  { label: 'Machine Learning', value: 'machine-learning' },
 ]
 const blogSortOptions = [
  { label: 'Popular', value: 'popular' },
  { label: 'Newest', value: 'newest' },
 ]
 const handleCategoryChange = (e) => {
  console.log(e);
 }
 const handleSortChange = (e) => {
  console.log(e);
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
       <input type="text" class="searchTerm" placeholder="What are you looking for?" />
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