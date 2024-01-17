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
  Icon
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';




export default function SignIn() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSignIn = () => {
        if (!email || !password) {
            alert("Please fill out all the fields.")
        }
        navigate("/");

    }

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
            <Input type="email" onChange={handleEmailChange}/>
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" onChange={handlePasswordChange}/>
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
              }}
              onClick={handleSignIn}
            >
              Sign in
            </Button>

            <Flex alignItems={"center"} justifyContent={"center"} my={1} gap={1} w={"full"}>
						<Box flex={2} h={"1px"} bg={"gray.400"} />
						<Text mx={1} color={"Black"}>
							OR
						</Text>
						<Box flex={2} h={"1px"} bg={"gray.400"} />
			</Flex>

            <Button
                leftIcon={<Icon as={FcGoogle} />}
                colorScheme="gray"
                variant="outline"
                w="full"
                mt={4}
      
            >
                Sign in with Google
            </Button>

          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
}
