import React from 'react';
import { Flex, Box, Heading, Text, Icon, VStack } from '@chakra-ui/react';
import { SearchIcon, CalendarIcon, PhoneIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const boxVariants = {
  offscreen: {
    scale: 0.95,
    opacity: 0,
    rotate: -10
  },
  onscreen: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const hoverEffect = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 300 }
};

const HowItWorksForCoaches = () => {
  const navigate = useNavigate();
  
  return (
    <VStack spacing={10} align="stretch" m={10} p={5}>
      <Heading as="h2" size="xl" textAlign="center"
          bgClip="text"
          fontWeight="bold"
          bgGradient="linear(to-r, #7928CA, #FF0080)"
          color="transparent"
      >
        For Coaches
      </Heading>
      <Flex wrap="wrap" justifyContent="center" alignItems="center">
        <MotionBox
          p={5}
          boxShadow="2xl"
          borderRadius="lg"
          bg="whiteAlpha.900"
          cursor="pointer"
          variants={boxVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.5 }}
          whileHover={hoverEffect}
          onClick={() => navigate('/become-a-coach')}
        >
          <Icon as={SearchIcon} w={12} h={12} color="#7928CA" mb={4} />
          <Heading size="md" mb={2}>Become a Coach</Heading>
          <Text fontSize="lg">
            Sign up and create your coach profile to showcase your expertise.
          </Text>
        </MotionBox>

        <MotionBox
          p={5}
          boxShadow="2xl"
          borderRadius="lg"
          bg="whiteAlpha.900"
          cursor="pointer"
          variants={boxVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.5 }}
          whileHover={hoverEffect}
        >
          <Icon as={CalendarIcon} w={12} h={12} color="#FF0080" mb={4} />
          <Heading size="md" mb={2}>Add Your Availability</Heading>
          <Text fontSize="lg">
            Set up your calendar and let clients know when you’re available.
          </Text>
        </MotionBox>

        <MotionBox
          p={5}
          boxShadow="2xl"
          borderRadius="lg"
          bg="whiteAlpha.900"
          cursor="pointer"
          variants={boxVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.5 }}
          whileHover={hoverEffect}
        >
          <Icon as={PhoneIcon} w={12} h={12} color="purple.500" mb={4} />
          <Heading size="md" mb={2}>Share Your Links</Heading>
          <Text fontSize="lg">
            Share your personal booking link with potential clients and grow your clientele.
          </Text>
        </MotionBox>
      </Flex>
    </VStack>
  );
};

export default HowItWorksForCoaches;
