import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsFillHeartFill, BsHeart } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/user.store';
import { baseURL } from '../../utils/makeRequest';
import { blogs, user } from '../../utils/temp';
import './Blog.scss';
const Blog = () => {
 const { id } = useParams();
 // find slug in array of blogs 
 const [blog, setBlog] = useState({})
 const [author, setAuthor] = useState({})
 const [isLikedByUser, setIsLikedByUser] = useState(false)
 const user = useAuthStore(state => state.user)
 const [refetch, setRefetch] = useState(true)
 const navigate = useNavigate()
 useEffect(() => {
  const getBlog = async () => {
   try {
    const res = await axios.get(`${baseURL}/api/blog/${id}`, { withCredentials: true });
    setBlog(res?.data?.blog);
    const { data } = await axios.get(`${baseURL}/api/auth/getUserById/${res?.data?.blog?.author}`, { withCredentials: true });
    setAuthor(data?.user);
    if (res?.data?.blog?.likedBy?.includes(user?._id)) setIsLikedByUser(true)
    else setIsLikedByUser(false)
   } catch (error) {
    if (error.response.status === 410) navigate('/blogs');
    console.log(error);
   }
  }
  getBlog()
 }, [refetch, user])

 const likeBlog = async () => {
  try {
   await axios.put(`${baseURL}/api/blog/likeBlog/${id}`, {}, { withCredentials: true });
   setRefetch(!refetch);
  } catch (error) {
   console.log(error);
  }
 }



 const {
  title,
  description,
  shortDescription,
  cover_image,
  category,
  createdAt,
  likedBy,
  isApproved,
  likes,
  slug = 'tempropary-slug'
 } = blog

 return (
  <div className='blog'>
   <div className="top">
    <div className="introSlice">
     <div className="left">
      <span>{`By`}</span>
      <span>{author?.username}</span>

     </div>
     <div className="right">
      <span>{createdAt?.split('T')[0]}</span>
      <div>
       {isLikedByUser ? <BsFillHeartFill color='red' onClick={likeBlog} /> : <BsHeart onClick={likeBlog} />}
       <span>{likes || 0}</span>
      </div>
     </div>
    </div>
    <h1>{title}</h1>
    <p>{shortDescription}</p>
    <img src={cover_image?.url} alt="" />
   </div>
   <div className="content" dangerouslySetInnerHTML={{ __html: description }}>

   </div>
   <div className="author-details">
    <img src={author?.avatar?.url} alt="" />
    <div>
     <div>
      <span>Name</span>
      <span>{author?.username}</span>
     </div>
     <div>
      <span>Profession</span>
      <span>{author?.profession || 'Geek'}</span>
     </div>
    </div>
    <button ><a className='link' href={`mailto:${author?.email}`}>Email me!</a></button>
   </div>
  </div >
 )
}

export default Blog