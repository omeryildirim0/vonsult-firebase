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
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword';


const SignUp = () => {
  

  const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		email: "",
		password: "",
    confirmPassword: ""
	});
  
  const { loading, error, signup } = useSignUpWithEmailAndPassword();

  const toast = useToast();



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
              <Input type="text" value={inputs.fullName} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
            </FormControl>
            
            <Button colorScheme="blue" width="full" 
              onClick={() => signup(inputs)}
            >
              Sign Up
            </Button>
            <Button leftIcon={<Icon as={FcGoogle} />} variant="outline" colorScheme="gray" width="full"
              
            >
              Sign Up with Google
            </Button>
          </VStack>
        </Box>
      </Grid>
    </ChakraProvider>
  );
};

export default SignUp;
