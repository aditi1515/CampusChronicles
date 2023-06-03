import React from 'react';
import { BsFillHeartFill, BsHeart } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { blogs, user } from '../../utils/temp';
import './Blog.scss';
const Blog = () => {
 const { slug: blogSlug } = useParams();
 // find slug in array of blogs 
 let blog = blogs[2];
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
 const isLikedByUser = true
 return (
  <div className='blog'>
   <div className="top">
    <div className="introSlice">
     <div className="left">
      <span>{`By`}</span>
      <span>{author}</span>

     </div>
     <div className="right">
      <span>{date}</span>
      <div>
       {isLikedByUser ? <BsFillHeartFill color='red' /> : <BsHeart />}
       <span>{likes}</span>
      </div>
     </div>
    </div>
    <h1>{title}</h1>
    <p>{short_description}</p>
    <img src={cover_image} alt="" />
   </div>
   <div className="content" dangerouslySetInnerHTML={{ __html: description }}>

   </div>
   <div className="author-details">
    <img src={user.profile.avatar} alt="" />
    <div>
     <div>
      <span>Name</span>
      <span>{user.fullname}</span>
     </div>
     <div>
      <span>Profession</span>
      <span>{user.profession}</span>
     </div>
    </div>
    <button ><a className='link' href={`mailto:${user.email}`}>Email me!</a></button>
   </div>
  </div >
 )
}

export default Blog