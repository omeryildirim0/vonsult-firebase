import React from 'react';
import { Flex, Box, Heading, Text, Icon, VStack, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { EditIcon, TimeIcon, LinkIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const HowItWorksForCoaches = () => {
  const navigate = useNavigate();

  return (
    <VStack spacing={8} align="stretch" m={5}>
      <Heading textAlign="center">For Coaches</Heading>
      <Flex wrap="wrap" justifyContent="center" alignItems="center">

        {/* Become a Coach - Now as a clickable box */}
        <LinkBox as={Box} p={5} boxShadow="md" borderRadius="lg" m={2} textAlign="center" width={['100%', '100%', '30%']} onClick={() => navigate('/become-a-coach')}>
          <Icon as={EditIcon} w={10} h={10} color="gray.600" mb={3} />
          <Heading size="md" mb={2}>Become a Coach</Heading>
          <Text fontSize="md">
            Sign up and create your coach profile to showcase your expertise.
          </Text>
          <LinkOverlay href="/become-a-coach" />
        </LinkBox>

        {/* Add Your Availability */}
        <Box p={5} boxShadow="md" borderRadius="lg" m={2} textAlign="center" width={['100%', '100%', '30%']}>
          <Icon as={TimeIcon} w={10} h={10} color="gray.600" mb={3} />
          <Heading size="md" mb={2}>Add Your Availability</Heading>
          <Text fontSize="md">
            Set up your calendar and let clients know when you’re available for consultations.
          </Text>
        </Box>

        {/* Share Your Personal Links */}
        <Box p={5} boxShadow="md" borderRadius="lg" m={2} textAlign="center" width={['100%', '100%', '30%']}>
          <Icon as={LinkIcon} w={10} h={10} color="gray.600" mb={3} />
          <Heading size="md" mb={2}>Share Your Links</Heading>
          <Text fontSize="md">
            Share your personal booking link with potential clients and grow your clientele.
          </Text>
        </Box>

      </Flex>
    </VStack>
  );
};

export default HowItWorksForCoaches;
