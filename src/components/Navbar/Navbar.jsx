import React from 'react';
import { Box, Flex, Link, Spacer } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Flex bg="blue.400" color="white" p={4}>
      <Box>Logo</Box>
      <Spacer />
      <Box>
        <Link href="/" mr={4}>Home</Link>
        <Link href="/about" mr={4}>About</Link>
        {/* More navigation links */}
      </Box>
    </Flex>
  );
};

export default Navbar;
