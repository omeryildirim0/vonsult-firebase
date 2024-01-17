
import { Link as RouterLink } from 'react-router-dom'

import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
  Stack,
  IconButton,
  useBreakpointValue,
  Collapse,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.600', 'white');
  const [isMobileNavOpen, setMobileNavOpen] = React.useState(false);

  // This will determine if we're on a mobile device based on the breakpoint
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      align="center"
      justify="space-between"
      bg={bgColor}
      color={color}
      py={2}
      px={4}
      position="sticky" // Make navbar sticky
      top="0" // Stick to the top of the viewport
      zIndex="1000" // Ensure it's above other content
      boxShadow="sm" // Optional: adds a subtle shadow to the navbar
    >
      <Flex align="center">
        <Text fontSize="xl" fontWeight="bold">
          Vonsult <span style={{ color: 'blue' }}>PRO</span>
        </Text>
      </Flex>

      {/* Mobile Menu Button */}
      {isMobile && (
        <IconButton
          icon={isMobileNavOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={() => setMobileNavOpen(!isMobileNavOpen)}
          variant="outline"
          aria-label="Toggle Navigation"
        />
      )}

      {/* Navigation Links */}
      <Collapse in={!isMobile || isMobileNavOpen} animateOpacity>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: isMobileNavOpen ? 'flex' : 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <Text mx={2} cursor="pointer">Components</Text>
          <Text mx={2} cursor="pointer">Pricing</Text>
          <Text mx={2} cursor="pointer">Marketplace</Text>
          <Text mx={2} cursor="pointer">Support</Text>
        </Stack>
      </Collapse>

      {/* Auth Buttons */}
      <Flex
        align="center"
        display={{ base: isMobileNavOpen ? 'none' : 'flex', md: 'flex' }}
      >
        <Button colorScheme="blue" variant="ghost" mr={4}>
          Sign In
        </Button>
        <Button colorScheme="blue" display={{ base: 'none', md: 'inline-flex' }}>
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
