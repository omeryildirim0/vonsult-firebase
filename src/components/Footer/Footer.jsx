import React from 'react';
import { Box } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="blue.400" color="white" p={4} textAlign="center">
      © {new Date().getFullYear()} Vonsult. All rights reserved.
    </Box>
  );
};

export default Footer;
