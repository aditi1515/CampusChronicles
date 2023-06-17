import React, { useEffect, useState } from 'react'
import { BsFillHeartFill, BsHeart } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/user.store'
import { blogs, user } from '../../utils/temp'
import './BlogCard.scss'
import axios from 'axios'
import { baseURL } from '../../utils/makeRequest'
const BlogCard = ({ blog }) => {

 const [author, setAuthor] = useState({})
 const [isLikedByUser, setIsLikedByUser] = useState(false)
 const {
  _id,
  title,
  description,
  shortDescription,
  cover_image,
  category,
  author: authorId,
  date,
  likes,
  isApproved,

 } = blog
 const user = useAuthStore(state => state.user)

 useEffect(() => {
  const getAuthor = async () => {
   try {
    const { data } = await axios.get(`${baseURL}/api/auth/getUserById/${blog?.author}`, { withCredentials: true });
    setAuthor(data?.user);
    if (blog?.likedBy?.includes(user?._id)) setIsLikedByUser(true)
    else setIsLikedByUser(false)
   } catch (error) {
    if (error?.response?.status === 410) navigate('/blogs');
    console.log(error);
   }
  }
  getAuthor()
 }, [blog])

 return (
  <div className='blogCard'>
   <Link className='link' to={`/blog/${_id}`}>
    <div className="cover">
     <img src={cover_image?.url} alt={title} />
    </div>
    <div className="info">
     <span className="chip">{category}</span>
     <h4>{title.substring(0, 70)}...</h4>
     <p>{shortDescription?.substring(0, 150)}...</p>
    </div>
    <div className="author">
     <div className="author-image">
      <img src={author?.avatar?.url} alt="" />
     </div>
     <span>{author.username}</span>
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