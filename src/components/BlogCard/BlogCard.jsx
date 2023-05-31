import React from 'react'
import { BsFillHeartFill, BsHeart } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { blogs, user } from '../../utils/temp'
import './BlogCard.scss'
const BlogCard = ({ blog }) => {
 const {
  title,
  description,
  short_description,
  cover_image,
  category,
  author,
  date,
  likes,
  isApproved,
  slug = 'tempropary-slug'
 } = blog

 const isLikedByUser = true; // check from likedBlogs array in user model 
 return (
  <div className='blogCard'>
   <Link className='link' to={`/blog/${slug}`}>
    <div className="cover">
     <img src={cover_image} alt={title} />
    </div>
    <div className="info">
     <span className="chip">{category}</span>
     <h4>{title.substring(0, 70)}...</h4>
     <p>{short_description.substring(0, 150)}...</p>
    </div>
    <div className="author">
     <div className="author-image">
      <img src={user.profile.avatar} alt="" />
     </div>
     <span>{user.fullname}</span>
     <span>.</span>
     <div>
      <span>{likes}</span>
      {isLikedByUser ? <BsFillHeartFill color='red' /> : <BsHeart />}
     </div>
    </div>
   </Link>
  </div>
 )
}

export default BlogCard