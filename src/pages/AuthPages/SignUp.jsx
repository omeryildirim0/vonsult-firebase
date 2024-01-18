import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Text,
  Icon,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc'; // Importing a placeholder Google icon

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      toast({
        title: 'Error',
        description: 'Please fill all the fields',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Handle the submission logic here (e.g., send data to server)
  };

  return (
    <ChakraProvider theme={theme}>
      <Grid minH="30vh" pt={10} p={3} justifyContent="center" alignItems="start">
        <Box w={{ base: 'full', md: '450px'}} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Text fontSize="2xl" mb={4} fontWeight="bold" textAlign="center">
            Sign Up
          </Text>
          <VStack spacing={4} align="flex-start">
            <FormControl id="full-name" isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <FormControl id="confirm-password" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </FormControl>
            <Button colorScheme="blue" width="full" onClick={handleSubmit}>
              Sign Up
            </Button>
            <Button leftIcon={<Icon as={FcGoogle} />} variant="outline" colorScheme="gray" width="full">
              Sign Up with Google
            </Button>
          </VStack>
        </Box>
      </Grid>
    </ChakraProvider>
  );
};

export default SignUp;
