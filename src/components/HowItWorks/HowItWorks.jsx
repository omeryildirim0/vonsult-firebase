import React from 'react';
import { Flex, Box, Heading, Text, Icon, VStack } from '@chakra-ui/react';
import { SearchIcon, CalendarIcon, PhoneIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  // Animation variants for the boxes
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

  // Hover effect for scale
  const hoverEffect = {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300 }
  };

  return (
    <VStack spacing={10} align="stretch" m={10} p={5}>
      <Heading as="h2" size="xl" textAlign="center"
          bgClip="text"
          fontWeight="bold"
          bgGradient="linear(to-r, #7928CA, #FF0080)"
          color="transparent"
      >
        How It Works
      </Heading>
      <Flex wrap="wrap" justifyContent="center" alignItems="center">
        <motion.div
          variants={boxVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.5 }}
          whileHover={hoverEffect}
        >
          <Box p={5} boxShadow="2xl" borderRadius="lg" bg="whiteAlpha.900" cursor="pointer">
            <Icon as={SearchIcon} w={12} h={12} color="#7928CA" mb={4} />
            <Heading size="md" mb={2}>Find an Expert</Heading>
            <Text fontSize="lg">
              Explore our curated list of top-tier influencers across various fields. Find your perfect match who aligns with your aspirations and needs.
            </Text>
          </Box>
        </motion.div>

        <motion.div
          variants={boxVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.5 }}
          whileHover={hoverEffect}
        >
          <Box p={5} boxShadow="2xl" borderRadius="lg" bg="whiteAlpha.900" cursor="pointer">
            <Icon as={CalendarIcon} w={12} h={12} color="#FF0080" mb={4} />
            <Heading size="md" mb={2}>Book a Video Call</Heading>
            <Text fontSize="lg">
              Easily schedule a session at a time that suits you both. Our intuitive interface makes booking hassle-free.
            </Text>
          </Box>
        </motion.div>

        <motion.div
          variants={boxVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.5 }}
          whileHover={hoverEffect}
        >
          <Box p={5} boxShadow="2xl" borderRadius="lg" bg="whiteAlpha.900" cursor="pointer">
            <Icon as={PhoneIcon} w={12} h={12} color="purple.500" mb={4} />
            <Heading size="md" mb={2}>Virtual Consultation</Heading>
            <Text fontSize="lg">
              Connect in a one-on-one video consultation. Engage in real-time, receive personalized advice, and ask questions to gain insights.
            </Text>
          </Box>
        </motion.div>
      </Flex>
    </VStack>
  );
};

export default HowItWorks;
