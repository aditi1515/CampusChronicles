import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../../assets/images/Yellow Dotted Portfolio Cover Page.png";
import { baseURL } from "../../utils/makeRequest";
import { blogs } from "../../utils/temp";
import "./HeroSection.scss";
const HeroSection = () => {
  const [blog, setBlog] = useState([])
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/api/blog?sortBy=${'likes'}`, { withCredentials: true });
        setBlog(data?.blogs[Math.floor(Math.random() * data?.blogs?.length)])
      } catch (error) {
        console.log(error);
      }
    }

    getBlogs()
  }, [])
  const {
    _id,
    title,
    description,
    shortDescription,
    cover_image,
    category,
    author,
    createdAt,
    likes,
    isApproved,
    slug = "tempropary-slug",
  } = blog;

  return (
    <div className="heroSection">
      {/* <h4>Our Blog</h4>
   <h1>Campus Chronicles</h1>
   <h3> Bridging the Gap Between Students and College Life</h3>
   <button>Create Blog</button> */}
      <div className="left">
        <div className="category-date">
          <span>{category} ,</span>
          <span>{createdAt?.split('T')[0]}</span>
        </div>
        <h1>{title}</h1>
        <p>{shortDescription}</p>
        <button><Link className="link" to={`/blog/${_id}`}>READ MORE</Link></button>
      </div>
      <div className="right">
        <div className="image-container">
          <img src={cover_image?.url} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
