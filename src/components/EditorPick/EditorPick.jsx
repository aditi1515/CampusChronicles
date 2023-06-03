import React from 'react';
import { blogs } from '../../utils/temp';
import './EditorPick.scss';
const EditorPick = () => {
  const blog1 = blogs[0];
  const blog2 = blogs[1];
  const blog3 = blogs[2];
  return (
    <div className='editorPick'>
      <h2>Editor's Pick</h2>
      <div className="cardContainer">
        <div className="left">
          <div className="editorPickCard">
            <img src={blog1.cover_image} alt={blog1.title} />
            <div className="details">
              <span>{blog1.category}</span>
              <h2>{blog1.title}</h2>
              <div className="lowerSlip">
                <span>By</span>
                <span>{blog1.author}</span>
                
                <span>{blog1.date}</span>
              </div>
            </div>
          </div>
          <div className="editorPickCard">
            <img src={blog2.cover_image} alt={blog2.title} />
            <div className="details">
              <span>{blog2.category}</span>
              <h2>{blog2.title}</h2>
              <div className="lowerSlip">
                <span>By</span>
                <span>{blog2.author}</span>
                <span>{blog2.date}</span>
              </div>
            </div>
          </div>
          <div className="editorPickCard">
            <img src={blog3.cover_image} alt={blog3.title} />
            <div className="details">
              <span>{blog3.category}</span>
              <h2>{blog3.title}</h2>
              <div className="lowerSlip">
                <span>By</span>
                <span>{blog3.author}</span>

                <span>{blog3.date}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="editorPickCard">
            <img src={blog1.cover_image} alt={blog1.title} />
            <div className="details">
              <span>{blog1.category}</span>
              <h2>{blog1.title}</h2>
              <div className="lowerSlip">
                <span>By</span>
                <span>{blog1.author}</span>
                
                <span>{blog1.date}</span>
              </div>
            </div>
          </div>
          <div className="editorPickCard">
            <img src={blog2.cover_image} alt={blog2.title} />
            <div className="details">
              <span>{blog2.category}</span>
              <h2>{blog2.title}</h2>
              <div className="lowerSlip">
                <span>By</span>
                <span>{blog2.author}</span>
                <span></span>
                <span>{blog2.date}</span>
              </div>
            </div>
          </div>
          <div className="editorPickCard">
            <img src={blog3.cover_image} alt={blog3.title} />
            <div className="details">
              <span>{blog3.category}</span>
              <h2>{blog3.title}</h2>
              <div className="lowerSlip">
                <span>By</span>
                <span>{blog3.author}</span>
              
                <span>{blog3.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorPick