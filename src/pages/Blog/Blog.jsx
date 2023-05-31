import React from 'react';
import { useParams } from 'react-router-dom';
import { blogs } from '../../utils/temp';
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
 return (
  <div className='blog'>
   <div className="top">
    <span>{date}</span>
    <h1>{title}</h1>
    <p>{short_description.substring(0, 70)} <br /> {short_description.substring(70)}</p>
    <img src={cover_image} alt="" />
   </div>
   <div className="content" dangerouslySetInnerHTML={{__html: description}}>
   </div>
  </div>
 )
}

export default Blog