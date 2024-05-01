import React from 'react';
import { Box, Flex, Heading, Text, Button, useBreakpointValue, keyframes } from '@chakra-ui/react';

// Define the gradient shift animation for the background
const gradientShift = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

// Define the slide-in text animation for the main content
const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
    width: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
    width: 100%;
  }
`;

const HeroSection = () => {
  const headingSize = useBreakpointValue({ base: 'xl', md: '2xl', lg: '3xl' });
  const textSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });

  const background = `linear-gradient(270deg, #FFD700, #FF6347, #40E0D0, #FF69B4, #BA55D3)`;

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      pt={{ base: '4', md: '6' }}
      pb={{ base: '4', md: '6' }}
      px={{ base: '2', md: '4' }}
      color="white"
      bg={background}
      backgroundSize="300% 300%"
      animation={`${gradientShift} 15s ease infinite`}
      minHeight="50vh"
      maxHeight="60vh"
    >
      <Heading
        as="h1"
        size={headingSize}
        fontWeight="bold"
        textAlign="center"
        mb="2"
        textShadow="2px 2px 5px black"
      >
        Your Growth Journey Starts Here
      </Heading>
      <Text
        fontSize={textSize}
        textAlign="center"
        maxW={{ base: "90%", md: "80%", lg: "2xl" }}
        mb="2"
        px="2"
        lineHeight="tall"
        overflow="hidden"
        whiteSpace="normal"
        animation={`${slideInFromRight} 2s ease-out forwards`}
      >
        We are a new startup where you can book 1-on-1 sessions with renowned influencers who specialize in fields such as fitness, fashion, style, and content creation, and ask them questions to get advice. At Vonsult, we are committed to bridging the gap between creativity and expertise.
      </Text>
      <Button
        size={buttonSize}
        bg="transparent"
        border="2px solid"
        borderColor="white"
        _hover={{ bg: 'whiteAlpha.300' }}
        textTransform="uppercase"
        fontWeight="bold"
        mt="2"
        px="8"
        py="4"
        boxShadow="0px 0px 8px white"
      >
        Explore Now
      </Button>
    </Flex>
  );
};

export default HeroSection;
