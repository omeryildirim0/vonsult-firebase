import { Box, Container, Stack, Text, Link, useColorModeValue } from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={4} spacing={4} justify={'center'} align={'center'}>
        <Stack direction={'row'} spacing={6}>
          <Link href={'#'}>Home</Link>
          <Link href={'#'}>About</Link>
          <Link href={'#'}>Blog</Link>
          <Link href="mailto:support@vonsult.com" isExternal>Contact</Link>
        </Stack>
        <Text>© 2024 Vonsult. All rights reserved.</Text>
        <Stack direction={'row'} spacing={6}>
          <Link href={'https://www.instagram.com/vonsult_marketplace/'} isExternal>
            <FaInstagram />
          </Link>
          
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
