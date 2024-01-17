
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
  Link
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Image as ChakraImage } from '@chakra-ui/react';
import logo from '../../assets/logo.png'

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
        
        <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
            Vonsult
        </Link>
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
      <Box
        display={{ base: isMobileNavOpen ? "block" : "none", md: "flex" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Stack
          spacing={8}
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <Text cursor="pointer">Components</Text>
          <Text cursor="pointer">Pricing</Text>
          <Text cursor="pointer">Marketplace</Text>
          <Text cursor="pointer">Support</Text>
        </Stack>
      </Box>

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
