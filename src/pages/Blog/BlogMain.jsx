import React from 'react';
import { Box, Heading, Text, VStack, Container } from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Dummy data for blog posts, you can replace this with real data fetched from your backend
const posts = [
  {
    id: 1,
    title: '5 Tips to Maximize Your Online Presence',
    excerpt: 'In today’s digital age, having a strong online presence is crucial. Whether you’re looking to grow your personal brand or expand your business, these five tips will help you stand out and reach a wider audience...',
    imageUrl: 'https://placeimg.com/640/480/tech',
    date: 'April 30, 2024',
  },
  {
    id: 2,
    title: 'How to Monetize Your Influencer Platform',
    excerpt: 'Monetizing your platform can seem daunting, but with the right strategies, it’s entirely feasible. From sponsored posts to affiliate marketing, discover the best practices to turn your influence into a steady income...',
    imageUrl: 'https://placeimg.com/640/480/nature',
    date: 'May 1, 2024',
  },
];

const BlogPost = ({ title, excerpt, imageUrl, date }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box h="200px" bgImage={`url(${imageUrl})`} bgPos="center" bgSize="cover" />
      <Heading fontSize="xl" mt={4}>{title}</Heading>
      <Text mt={2}>{excerpt}</Text>
      <Text fontSize="sm" color="gray.500">{date}</Text>
    </Box>
  );
};

const HeroSection = () => {
  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      minHeight="30vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={5}
      bgGradient="linear(to-r, teal.500, green.500)"
      color="white"
      textAlign="center"
    >
      <Box>
        <Heading as={motion.h1} size="2xl">
          Empower Your Influence
        </Heading>
        <Text fontSize="xl">
          Dive into expert insights and exclusive strategies tailored for influencers looking to expand their reach and effectiveness.
        </Text>
      </Box>
    </Box>
  );
};

const BlogPage = () => {
  return (
    <Container maxW="container.xl" centerContent>
      <HeroSection />
      <VStack spacing={8} mt={5}>
        {posts.map(post => (
          <BlogPost key={post.id} {...post} />
        ))}
      </VStack>
    </Container>
  );
};

export default BlogPage;
