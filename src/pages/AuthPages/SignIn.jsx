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
  useToast,
  Icon,
  Alert, 
  AlertIcon,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';




export default function SignIn() {

    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
      email: "",
      password: "",
    });
    const toast = useToast();
    const { loading, error, login } = useLogin();

    

  return (
    <Flex
      minH={'30vh'}
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
            <Input type="email" onChange={(e) => setInputs({ ...inputs, email: e.target.value })}/>
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" onChange={(e) => setInputs({ ...inputs, password: e.target.value })}/>
          </FormControl>

          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }} // Stack direction changes based on screen size
              align={'start'}
              justify={'space-between'}>
              <Link color={'green.400'} onClick={()=> navigate('/sign-up')}>Sign Up</Link>
              <Link color={'blue.400'}>Forgot password?</Link>
            </Stack>
            {error && (
              <Alert status='error' fontSize={13} p={2} borderRadius={4}>
                <AlertIcon fontSize={12} />
                {error.message}
              </Alert>
			      )}

            <Button
              colorScheme="blue"
              isLoading={loading}

              onClick={() => login(inputs)}
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
