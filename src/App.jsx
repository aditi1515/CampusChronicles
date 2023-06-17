import axios from "axios"
import { SnackbarProvider } from "notistack"
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import reactLogo from './assets/react.svg'
import BlogCard from './components/BlogCard/BlogCard'
import CreateBlog from "./components/CreateBlog/CreateBlog"
import Footer from './components/Footer/Footer'
import HeroSection from './components/HeroSection/HeroSection'
import HomeSectionImage from './components/HomeSectionImage/HomeSectionImage'
import Navbar from './components/Navbar/Navbar'
import PopularBlogs from './components/PopularBlogs/PopularBlogs'
import RecentArticles from './components/RecentArticles/RecentArticles'
import Page404 from "./pages/404/Page404"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Blog from './pages/Blog/Blog'
import BlogStatus from "./pages/BlogStatus/BlogStatus"
import Blogs from './pages/Blogs/Blogs'
import Dashboard from './pages/Dashboard/Dashboard'
import Home from './pages/Home/Home'
import { useAuthStore } from "./store/user.store"
import { baseURL } from "./utils/makeRequest"
import viteLogo from '/vite.svg'
function App() {
  const [count, setCount] = useState(0)
  const loginUser = useAuthStore(state => state.loginUser)
  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/auth/me`, {
          withCredentials: true,
        });
        if (data.success) {
          loginUser(data.user)
        }
        else {
          // user not present / token expired
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  })
  return (
    <>
      <SnackbarProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/blog/create' element={<CreateBlog />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blog/:id' element={<Blog />} />
          <Route path='/blogs-status' element={<BlogStatus />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </SnackbarProvider>
    </>
  )
}

export default App
