import React from 'react';
import { Box, Heading, Text, Image, Container } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const ArticlePage = () => {
  const { id } = useParams(); // Get the article ID from URL
  const article = blogPosts.find(post => post.id.toString() === id); // Find the article by ID

  if (!article) {
    return <Text>Article not found</Text>;
  }

  return (
    <Container maxW="container.xl">
      <Box my={8} p={5} shadow="md" borderWidth="1px">
        {article.imageUrl && <Image src={article.imageUrl} alt={article.title} />}
        <Heading as="h1" my={4}>{article.title}</Heading>
        <Text mt={4}>{article.excerpt}</Text>
        {/* Here, you might also render the full article content */}
      </Box>
    </Container>
  );
};

export default ArticlePage;
