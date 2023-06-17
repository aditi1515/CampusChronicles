import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { baseURL } from '../../utils/makeRequest'
import './EditorPick.scss'
const EditorsPickCard = ({ blog }) => {

 const [author, setAuthor] = useState({})
 useEffect(() => {
  const getAuthor = async () => {
   try {
    const { data } = await axios.get(`${baseURL}/api/auth/getUserById/${blog?.author}`, { withCredentials: true });
    setAuthor(data?.user);
   } catch (error) {
    if (error.response.status === 410) navigate('/blogs');
    console.log(error);
   }
  }
  getAuthor()
 }, [])

 return (
  <div className="editorPickCard">

   <img src={blog?.cover_image?.url} alt={blog?.title} />
   <div className="details">
    <span>{blog?.category || others}</span>
    <h2>{blog?.title}</h2>
    <div className="lowerSlip">
     <span>By</span>
     <span>{author?.username}</span>
     <span>{blog?.createdAt?.split('T')[0]}</span>
    </div>
    <u style={{ fontSize: '13px' }}><Link className='link' to={`/blog/${blog?._id}`}>Know More</Link></u>
   </div>

  </div>
 )
}

export default EditorsPickCard