// ProfileSection.js
import React from 'react';
import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

const CoachProfile = () => {
  const cardBg = useColorModeValue('white', 'gray.700'); // Adjusts color based on theme

  return (
    <Box 
        bg={cardBg} 
        boxShadow="sm" 
        borderRadius="lg" 
        p={5} 
        m={5} 
        textAlign="center"
    
    >
      <VStack spacing={4}>
        <Image
          borderRadius="full"
          boxSize="150px"
          src="https://bit.ly/dan-abramov" // Replace with actual image source
          alt="Coach Profile Image"
        />
        <Text fontWeight="bold">Coach Name</Text>
        <Text fontSize="sm" color="gray.500">Expertise Area</Text>
        <Text fontSize="sm">Bio description...</Text>
        <HStack justify="center" mt={4}>
          <Button size="sm" colorScheme="blue">Edit Profile</Button>
          <Button size="sm" variant="outline">View Public Profile</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default CoachProfile;
