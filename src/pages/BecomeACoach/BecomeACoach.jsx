//Become a Coach page
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
  Textarea,
  Flex,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc'; // Importing a placeholder Google icon
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword';
import useSignUpCoachesWithEmail from '../../hooks/useSignUpCoachesWithEmail'

const SignUp = () => {
  

  const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		email: "",
		password: "",
    bio: "",
    profileImage: "",
    hourlyRate: "",
	});
  
  const { loading, error, signup } = useSignUpCoachesWithEmail();
  
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
            Join Vonsult as a Coach
          </Text>
          <Text fontSize="lg" mb={4} fontWeight="bold" textAlign="center">
            Connect with people who need your expertise, give them advice and earn money.
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
            <FormControl id="bio" isRequired>
                <FormLabel>Bio</FormLabel>
                <Textarea
                    placeholder="Tell us about your achievements"
                    name="bio"
                    value={inputs.bio}
                    onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                    size="sm"
                />
            </FormControl>
            <FormControl id="profile-pic" isRequired>
              <FormLabel>Profile Picture</FormLabel>
              <Input type="file"  onChange={(e) => setInputs( {...inputs, profileImage: e.target.files[0] || undefined})} />
            </FormControl>
            <FormControl id="hourly-rate" isRequired>
              <FormLabel>Hourly Rate ($)</FormLabel>
              <NumberInput min={0}>
                <NumberInputField value={inputs.hourlyRate} onChange={(e) => setInputs({ ...inputs, hourlyRate: e.target.value })} />
              </NumberInput>
            </FormControl>
            
            <Button 
              colorScheme="blue" 
              width="full"
              isLoading={loading} 
              onClick={() => signup(inputs)}
              isDisabled={loading}
            >
              Join as a Coach
            </Button>

    
          </Stack>
        </Box>
      
    </Flex>
  );
};

export default SignUp;