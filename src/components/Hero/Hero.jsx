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
        Elevate Your Content Creation
      </Heading>
      <Text
        fontSize={{ base: 'md', md: 'lg' }}
        textAlign="center"
        maxW="2xl"
        mb="8"
      >
        Join our community of professionals to boost your content quality and engage with your audience like never before.
      </Text>
      <Button
        size={buttonSize}
        colorScheme="teal"
        mb={{ base: '4', md: '8' }}
      >
        Get Started
      </Button>
    </Flex>
  );
};

export default HeroSection;
