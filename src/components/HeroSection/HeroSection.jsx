import React from "react";
import "./HeroSection.scss";
import { blogs } from "../../utils/temp";
import bgImage from "../../assets/images/Yellow Dotted Portfolio Cover Page.png";
const HeroSection = () => {
  const blog = blogs[0];
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
          <span>{date}</span>
        </div>
        <h1>{title}</h1>
        <p>{short_description}</p>
        <button>READ MORE</button>
      </div>
      <div className="right">
        <div className="image-container">
          <img src={cover_image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
