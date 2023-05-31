import React from 'react'
import HeroSection from '../../components/HeroSection/HeroSection'
import PopularBlogs from '../../components/PopularBlogs/PopularBlogs'
import RecentArticles from '../../components/RecentArticles/RecentArticles'
import './Home.scss'
const Home = () => {
 return (
  <div className='home'>
   <HeroSection />
   {/* <HomeSectionImage /> */}
   <RecentArticles />
   <PopularBlogs />
  </div>
 )
}

export default Home