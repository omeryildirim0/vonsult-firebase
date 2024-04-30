import { Box, Flex, Button, Heading, Text, Image, useBreakpointValue } from '@chakra-ui/react';
import coachhero from '../../assets/coachhero1.jpg';
import { useNavigate } from 'react-router-dom';


const CoachesHero = () => {
    const headingSize = useBreakpointValue({ base: 'md', md: 'xl', lg: '2xl' });
  
    // This will determine the size of the button based on the current breakpoint
    const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
    const navigate = useNavigate();
  
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        pt={{ base: '10', md: '20' }}
        pb={{ base: '10', md: '20' }}
        px={{ base: '6', md: '8' }}
        backgroundImage={coachhero} // Replace with your background image path
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
          mt="4"
          color={"black"}
        >
          Connect with Your Followers Virtually, Give Them Advice, and Earn Money
        </Heading>
        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          textAlign="center"
          maxW="2xl"
          mb="8"
          fontWeight="bold"
          color={"black"}
        >
          Turn your expertise into income by connecting directly with your followers.
        </Text>
        <Button
            size={buttonSize}
            colorScheme="teal" // Change color scheme according to your brand's theme
            mb={{ base: '4', md: '8' }}
            onClick={() => navigate('/become-a-coach')} // Navigate to the "Become a Coach" page
        >
            Become a Coach
        </Button>
       
      </Flex>
    );
};

export default CoachesHero;
