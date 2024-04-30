import React, { useState } from 'react';
import { Box, Input, Button, Text, Flex, useToast } from '@chakra-ui/react';
import useAddEmailToNewsletter from '../../hooks/useAddEmailToNewsletter';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const { addEmailToNewsletter, isSaving, error } = useAddEmailToNewsletter();
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await addEmailToNewsletter(email);
    if (success) {
      toast({
        title: "Success",
        description: "Thank you for signing up!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setEmail('');
    } else {
      toast({
        title: "Error",
        description: "Failed to add to newsletter. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex align="center" justify="center" p={5} bg="gray.700">
      <Box width="full" maxW="md" bg="gray.700">
        <Text fontSize="xl" fontWeight="bold" color="white" mb={4} textAlign="center">
          Sign up for our newsletter to get the latest updates and news about our platform!
        </Text>
        <Flex as="form" onSubmit={handleSubmit} align="center" justify="center">
          <Input
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRequired
            mr={2}  // Margin right for spacing between input and button
            bg="white"  // Explicitly setting the background color to white
            color="gray.800"  // Setting text color to something darker for visibility
          />
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isSaving}
          >
            Submit
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default NewsletterSignup;
