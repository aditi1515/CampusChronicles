import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import reactLogo from './assets/react.svg'
import BlogCard from './components/BlogCard/BlogCard'
import HeroSection from './components/HeroSection/HeroSection'
import HomeSectionImage from './components/HomeSectionImage/HomeSectionImage'
import Navbar from './components/Navbar/Navbar'
import PopularBlogs from './components/PopularBlogs/PopularBlogs'
import RecentArticles from './components/RecentArticles/RecentArticles'
import Blog from './pages/Blog/Blog'
import Home from './pages/Home/Home'
import viteLogo from '/vite.svg'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog/:slug' element={<Blog />} />
      </Routes>
    </>
  )
}

export default App
