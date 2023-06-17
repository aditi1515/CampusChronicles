import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { baseURL } from '../../utils/makeRequest';
import { blogs } from '../../utils/temp';
import './EditorPick.scss';
import EditorsPickCard from './EditorsPickCard';
const EditorPick = () => {
  const [blogs, setBlogs] = useState([])

  function randomizeArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/api/blog`, { withCredentials: true });
        setBlogs(randomizeArray(data?.blogs))
      } catch (error) {
        console.log(error);
      }
    }

    getBlogs()
  }, [])
  const blog1 = blogs[0];
  const blog2 = blogs[1];
  const blog3 = blogs[2];
  return (
    <div className='editorPick'>
      <h2 >Editor's Pick</h2>
      <div className="cardContainer">
        <div className="left">
          {blogs?.slice(0, 3)?.map((blog, index) => <EditorsPickCard blog={blog} key={index} />)}

        </div>
        <div className="right">
          {blogs?.slice(3, 6)?.map((blog, index) => <EditorsPickCard blog={blog} key={index} />)}
        </div>
      </div>
    </div>
  )
}

export default EditorPick