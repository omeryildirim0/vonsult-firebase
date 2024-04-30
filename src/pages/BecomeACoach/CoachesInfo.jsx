import React from 'react';
import { Box, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import CoachesHero from './CoachesHero.jsx';
import Benefits from './Benefits.jsx';


const CoachesInfo = () => {
  return (
    <Box>
      <CoachesHero />
      <Benefits />

    </Box>

    
  );
};

export default CoachesInfo;
