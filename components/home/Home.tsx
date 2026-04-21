import React from 'react'
import {Hero} from './Hero'
import Navbar from "./Navbar"
import Scroll from "./Scroll"
import {Features} from "./Features"
import {Footer} from "./Footer"
const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Scroll/>
    <Features/>
    <Footer/>
    </>
  )
}

export default Home