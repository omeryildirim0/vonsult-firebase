import React from 'react';
import { Box, Heading, Text, Container, VStack, Image, Divider } from '@chakra-ui/react';

// Sample article data, replace with data fetched from your backend or API
const article = {
  title: 'The Ultimate Guide to Building Your Personal Brand',
  content: `Building a strong personal brand online can significantly impact your ability to attract new opportunities and grow your influence. This guide provides a comprehensive approach to defining your voice, enhancing your online presence, and connecting effectively with your audience. \n\n### Step 1: Define Your Niche\nStart by identifying the unique aspects of your personality and expertise that differentiate you from others in your field. This will be the foundation of your personal brand.\n\n### Step 2: Create Compelling Content\nContent is king in the digital world. Create valuable, engaging content that resonates with your audience and reflects your unique perspective.\n\n### Step 3: Engage Regularly\nConsistency is key. Regular engagement with your audience helps to build trust and establish your reputation as a thought leader in your niche.`,
  imageUrl: 'https://placeimg.com/640/480/nature',
  date: 'May 5, 2024',
  author: 'Jane Doe'
};

const ArticlePage = () => {
  return (
    <Container maxW="container.lg" centerContent>
      <VStack spacing={5} mt={5}>
        <Image borderRadius="lg" src={article.imageUrl} alt="Article Image" objectFit="cover" />
        <Heading>{article.title}</Heading>
        <Text color="gray.500">By {article.author} | {article.date}</Text>
        <Divider />
        <Text whiteSpace="pre-wrap">{article.content}</Text>
      </VStack>
    </Container>
  );
};

export default ArticlePage;
