import React from 'react';
import { Flex, Box, Heading, Text, Icon, VStack } from '@chakra-ui/react';
import { SearchIcon, CalendarIcon, PhoneIcon } from '@chakra-ui/icons';


const HowItWorks = () => {
  return (
    <VStack spacing={8} align="stretch" m={5}>
      <Heading textAlign="center">How It Works for Users</Heading>
      <Flex wrap="wrap" justifyContent="center" alignItems="center">
        {/* Find an Expert */}
        <Box p={5} boxShadow="md" borderRadius="lg" m={2} textAlign="center" width={['100%', '100%', '30%']}>
          <Icon as={SearchIcon} w={10} h={10} color="gray.600" mb={3} />
          <Heading size="md" mb={2}>Find an Expert</Heading>
          <Text fontSize="md">
            Discover and choose from our list of the world’s most in-demand experts
          </Text>
        </Box>

        {/* Book a Video Call */}
        <Box p={5} boxShadow="md" borderRadius="lg" m={2} textAlign="center" width={['100%', '100%', '30%']}>
          <Icon as={CalendarIcon} w={10} h={10} color="gray.600" mb={3} />
          <Heading size="md" mb={2}>Book a Video Call</Heading>
          <Text fontSize="md">
            Select a time that works for both you and your expert's schedule
          </Text>
        </Box>

        {/* Virtual Consultation */}
        <Box p={5} boxShadow="md" borderRadius="lg" m={2} textAlign="center" width={['100%', '100%', '30%']}>
          <Icon as={PhoneIcon} w={10} h={10} color="gray.600" mb={3} /> {/* Use an icon that represents video calls */}
          <Heading size="md" mb={2}>Virtual Consultation</Heading>
          <Text fontSize="md">
            Join the 1-on-1 video call, ask questions, and get expert advice
          </Text>
        </Box>
      </Flex>
    </VStack>
  );
};

export default HowItWorks;
