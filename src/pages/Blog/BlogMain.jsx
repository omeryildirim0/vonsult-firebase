import React from 'react';
import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Flex,
  Divider,
  Container,
  SimpleGrid,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const BlogMainPage = () => {
  // Mock data for blog posts, replace with your actual data
  const blogPosts = [
    {
      id: 1,
      title: 'Unleash Your Inner Maverick: Top 5 Secrets Of Success For Female Trailblazers',
      excerpt: 'Uncover top secrets of success for the female trailblazer navigating challenges, triumphs, and the pursuit of success.',
      imageUrl: 'path_to_your_featured_image.jpg',
    },
    {
      id: 2,
      title: 'Unleash Your Inner Maverick: Top 5 Secrets Of Success For Female Trailblazers',
      excerpt: 'Uncover top secrets of success for the female trailblazer navigating challenges, triumphs, and the pursuit of success.',
      imageUrl: 'path_to_your_featured_image.jpg',
    },
    {
      id: 3,
      title: 'Unleash Your Inner Maverick: Top 5 Secrets Of Success For Female Trailblazers',
      excerpt: 'Uncover top secrets of success for the female trailblazer navigating challenges, triumphs, and the pursuit of success.',
      imageUrl: 'path_to_your_featured_image.jpg',
    },
    {
      id: 4,
      title: 'Unleash Your Inner Maverick: Top 5 Secrets Of Success For Female Trailblazers',
      excerpt: 'Uncover top secrets of success for the female trailblazer navigating challenges, triumphs, and the pursuit of success.',
      imageUrl: 'path_to_your_featured_image.jpg',
    },
    // ...other posts
  ];

  return (
    <Box>
      <Container maxW="container.xl">
        <Heading as="h1" my={8}>
          Vonsult Blog
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {blogPosts.map(post => (
            <Box key={post.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{post.title}</Heading>
              <Text mt={4}>{post.excerpt}</Text>
              <Button as={Link} to={`/article/${post.id}`} mt={4} colorScheme="teal">Read More</Button>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    
    </Box>
  );
};

export default BlogMainPage;
