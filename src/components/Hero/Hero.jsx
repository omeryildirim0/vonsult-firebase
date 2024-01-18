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
        Innovative Ideas. Smart Solutions. 
      </Heading>
      <Text
        fontSize={{ base: 'md', md: 'lg' }}
        textAlign="center"
        maxW="2xl"
        mb="8"
      >
        Welcome to Vonsult, a new startup that helps aspiring content creators achieve their goals.
        Our team of experienced coaches will provide you with the tools and guidance you need to succeed. 
        Contact us to book a session today. 
      </Text>
      <Button
        size={buttonSize}
        colorScheme="red"
        mb={{ base: '4', md: '8' }}
      >
        Get Started
      </Button>
    </Flex>
  );
};

export default HeroSection;
