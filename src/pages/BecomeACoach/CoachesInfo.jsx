import React from 'react';
import { Box, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import CoachesHero from './CoachesHero.jsx';
import Benefits from './Benefits.jsx';
import FAQSection from './FAQ.jsx';


const CoachesInfo = () => {
  return (
    <Box>
      <CoachesHero />
      <Benefits />
      <FAQSection />

    </Box>

    
  );
};

export default CoachesInfo;
