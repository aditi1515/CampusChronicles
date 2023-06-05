import { SnackbarProvider } from "notistack"
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import reactLogo from './assets/react.svg'
import BlogCard from './components/BlogCard/BlogCard'
import Footer from './components/Footer/Footer'
import HeroSection from './components/HeroSection/HeroSection'
import HomeSectionImage from './components/HomeSectionImage/HomeSectionImage'
import Navbar from './components/Navbar/Navbar'
import PopularBlogs from './components/PopularBlogs/PopularBlogs'
import RecentArticles from './components/RecentArticles/RecentArticles'
import Blog from './pages/Blog/Blog'
import BlogStatus from "./pages/BlogStatus/BlogStatus"
import Blogs from './pages/Blogs/Blogs'
import Dashboard from './pages/Dashboard/Dashboard'
import Home from './pages/Home/Home'
import viteLogo from '/vite.svg'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SnackbarProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blog/:id' element={<Blog />} />
          <Route path='/blogs-status' element={<BlogStatus />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
        <Footer />
      </SnackbarProvider>
    </>
  )
}

export default App
