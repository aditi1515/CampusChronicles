import React from 'react'
import Banner from '../../components/Banner/Banner'
import EditorPick from '../../components/EditorPick/EditorPick'
import HeroSection from '../../components/HeroSection/HeroSection'
import PopularBlogs from '../../components/PopularBlogs/PopularBlogs'
import RecentArticles from '../../components/RecentArticles/RecentArticles'
import './Home.scss'
const Home = () => {
 return (
  <div className='home'>
   <HeroSection />
   {/* <HomeSectionImage /> */}
   {/* <Banner /> */}
   <RecentArticles />
   <PopularBlogs />
   <EditorPick />
  </div>
 )
}

export default Home