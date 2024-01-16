import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function SignIn() {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      p={4} // Adds padding to avoid edge-to-edge content on small screens
      bg={useColorModeValue('gray.50', 'gray.800')}>
      
      <Box
        w={{ base: 'full', md: '450px'}} // Full width on small screens, fixed width on medium and up
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        
        <Stack spacing={4}>
          <Heading fontSize={'2xl'} textAlign="center">Sign in to your account</Heading>

          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>

          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }} // Stack direction changes based on screen size
              align={'start'}
              justify={'space-between'}>
              <Link color={'green.400'}>Sign Up</Link>
              <Link color={'blue.400'}>Forgot password?</Link>
            </Stack>

            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
}
