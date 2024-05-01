import React, { useRef } from 'react'
import HeroSection from '../../components/Hero/Hero'
import CoachCarousel from '../../components/CoachCarousel/CoachCarousel'
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import HowItWorksForCoaches from '../../components/HowItWorks/HowItWorksForCoaches'
import Newsletter from '../../components/Newsletter/Newsletter'

const HomePage = () => {
  const coachCarouselRef = useRef(null);

  return (
    <>
      <HeroSection scrollToRef={coachCarouselRef} />
      <CoachCarousel ref={coachCarouselRef} /> 
      <HowItWorks />
      <HowItWorksForCoaches />
      <Newsletter />
    </>
  
  )
}

export default HomePage
