import React from 'react'
import HeroSection from '../../components/Hero/Hero'
import CoachCarousel from '../../components/CoachCarousel/CoachCarousel'
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import HowItWorksForCoaches from '../../components/HowItWorks/HowItWorksForCoaches'


const HomePage = () => {
  return (
    <>
      <HeroSection />
      <CoachCarousel />
      <HowItWorks />
      <HowItWorksForCoaches />
    </>
  
  )
}

export default HomePage
