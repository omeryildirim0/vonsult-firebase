import React from 'react';
import { Box, Heading, Text, List, ListItem, ListIcon, Divider } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const HowItWorks = () => {
    return (
        <Box p={5}>
            <Heading mb={4}>How Vonsult Works for Content Creators</Heading>
            <Text fontSize="lg" mb={4}>
                Discover how our platform connects you with experienced coaches to foster growth, creativity, and success.
            </Text>

            {/* Step 1 */}
            <Heading size="md" mb={2}>Step 1: Sign Up and Explore</Heading>
            <List spacing={2} mb={4}>
                <ListItem><ListIcon as={CheckCircleIcon} color="green.500" />Create Your Account: Quick and easy sign-up process.</ListItem>
                <ListItem><ListIcon as={CheckCircleIcon} color="green.500" />Explore Coaches: Browse through our diverse range of experienced coaches.</ListItem>
            </List>
            
            {/* Step 2 */}
            <Heading size="md" mb={2}>Step 2: Choose Your Coach</Heading>
            <List spacing={2} mb={4}>
                <ListItem><ListIcon as={CheckCircleIcon} color="green.500" />View Profiles: Learn about each coach’s expertise, experience, and approach.</ListItem>
                <ListItem><ListIcon as={CheckCircleIcon} color="green.500" />Check Availability: View real-time availability to find a time that works for you.</ListItem>
            </List>

            {/* Step 3 */}
            <Heading size="md" mb={2}>Step 3: Book Your Appointment</Heading>
            <List spacing={2} mb={4}>
                <ListItem><ListIcon as={CheckCircleIcon} color="green.500" />Book a Session: Choose a time slot and book your appointment with ease.</ListItem>
                <ListItem><ListIcon as={CheckCircleIcon} color="green.500" />Payment Process: Secure payment gateway for hassle-free transactions.</ListItem>
            </List>

            {/* Step 4 */}
            <Heading size="md" mb={2}>Step 4: Get Inspired</Heading>
            <List spacing={2} mb={4}>
                <ListItem><ListIcon as={CheckCircleIcon} color="green.500" />Virtual Meetings: Connect with your coach via our integrated video platform.</ListItem>
                <ListItem><ListIcon as={CheckCircleIcon} color="green.500" />Receive Tailored Advice: Gain valuable insights and personalized guidance.</ListItem>
            </List>

            {/* Step 5 */}
            <Heading size="md" mb={2}>Step 5: Review and Grow</Heading>
            <List spacing={2}>
                <ListItem><ListIcon as={CheckCircleIcon} color="green.500" />Feedback: Share your experience and help us improve.</ListItem>
                <ListItem><ListIcon as={CheckCircleIcon} color="green.500" />Continuous Learning: Keep engaging with coaches for ongoing development.</ListItem>
            </List>

            <Divider my={5} />

            <Text fontSize="xl" mb={3}>
                Your Growth Journey Starts Here! At Vonsult, we are committed to bridging the gap between creativity and expertise. Start your journey today!
            </Text>
        </Box>
    );
};

export default HowItWorks;
