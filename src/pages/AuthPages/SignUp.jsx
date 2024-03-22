import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Stack,
  Grid,
  theme,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Text,
  Icon,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc'; // Importing a placeholder Google icon
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword';
import GoogleAuth from './GoogleAuth';

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
    <Flex
    minH={'30vh'}
    align={'center'}
    justify={'center'}
    p={4} // Adds padding to avoid edge-to-edge content on small screens
    bg={useColorModeValue('gray.50', 'gray.800')}>

      
        <Box 
          w={{ base: 'full', md: '450px'}} 
          p={8} borderWidth="1px" 
          borderRadius="lg" 
          overflow="hidden"
          bg={useColorModeValue('white', 'gray.700')}
        >
          <Text fontSize="2xl" mb={4} fontWeight="bold" textAlign="center">
            Sign Up
          </Text>
          <Stack spacing={4} align="flex-start">
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

            <Flex alignItems={"center"} justifyContent={"center"} my={1} gap={1} w={"full"}>
						<Box flex={2} h={"1px"} bg={"gray.400"} />
						<Text mx={1} color={"Black"}>
							OR
						</Text>
						<Box flex={2} h={"1px"} bg={"gray.400"} />
            </Flex>

            <Flex alignItems={"center"} justifyContent={"center"} my={1} gap={1} w={"full"}>
              <GoogleAuth prefix={"Sign up"} />
            </Flex>
    
          </Stack>
        </Box>
      
    </Flex>
  );
};

export default SignUp;
