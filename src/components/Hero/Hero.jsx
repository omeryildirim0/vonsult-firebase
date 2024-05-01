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
        textShadow="2px 2px 5px black" // Adds shadow to text
      >
        Your Growth Journey Starts Here
      </Heading>
      <Text
        fontSize={{ base: 'md', md: 'lg' }}
        textAlign="center"
        maxW="2xl"
        mb="4"
        fontWeight="bold"
        textShadow="1px 1px 3px black" // Adds shadow to text
      >
        We are a new startup where you can book 1-on-1 sessions with renowned influencers who specialize in fields such as fitness, fashion, style and content creation, and ask them questions to get advice. 
        At Vonsult, we are committed to bridging the gap between creativity and expertise.
      </Text>

      <Text
        fontSize={{ base: 'lg', md: 'xl' }}
        fontWeight="bold"
        mb="4"
        textAlign="center"
        textShadow="1px 1px 3px black"
      >
        Start your journey today!
      </Text>
     
    </Flex>
  );
};

export default HeroSection;