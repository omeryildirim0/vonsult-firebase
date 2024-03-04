import React from 'react';
import { Box, Flex, Heading, Text, Button, useBreakpointValue, Image } from '@chakra-ui/react';
import hero from '../../assets/hero.jpg'

const HeroSection = () => {
  // This will determine the size of the heading based on the current breakpoint
  const headingSize = useBreakpointValue({ base: 'md', md: 'xl', lg: '2xl' });
  
  // This will determine the size of the button based on the current breakpoint
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      pt={{ base: '10', md: '20' }}
      pb={{ base: '10', md: '20' }}
      px={{ base: '6', md: '8' }}
      backgroundImage={hero} // Replace with your background image path
      backgroundSize="cover"
      backgroundPosition="center"
      color="white"
    >
      <Heading
        as="h1"
        size={headingSize}
        fontWeight="bold"
        textAlign="center"
        mb="4"
      >
        Your Growth Journey Starts Here
      </Heading>
      <Text
        fontSize={{ base: 'md', md: 'lg' }}
        textAlign="center"
        maxW="2xl"
        mb="8"
        fontWeight="bold"
      >
        We are a new startup where you can book 1-on-1 sessions with renowned experts from different fields and ask them questions to get help. 
        At Vonsult, we are committed to bridging the gap between creativity and expertise. Start your journey today!
      </Text>
      
     
    </Flex>
  );
};

export default HeroSection;