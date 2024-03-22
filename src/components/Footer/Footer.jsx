import React from 'react';
import { Box, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="blue.400" color="white" p={4} textAlign="center">
      © {new Date().getFullYear()} Vonsult. All rights reserved.
      <Link href="mailto:support@vonsult.com" isExternal ml={2} style={{ textDecoration: 'underline' }}>
        Contact Us
      </Link>
    </Box>
  );
};

export default Footer;
