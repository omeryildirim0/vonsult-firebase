import { Box, Container, Heading, Text, VStack, Link, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxW={'5xl'}>
      <VStack spacing={5} align="stretch">
        <Box mt={5}>
          <Heading as="h1" size="xl">About Vonsult</Heading>
          <Text fontSize="md" mt={4}>
            At Vonsult, Inc., we're pioneering a new way for influencers and their followers to engage directly and meaningfully. Our innovative platform facilitates personalized video consultations across diverse domains such as fitness, fashion, content creation, and nutrition. Designed with both user friendliness and technical robustness in mind, Vonsult offers streamlined scheduling, integrated payment systems, and sophisticated tools for community engagement and performance analytics, ensuring a seamless and enriching experience for users and influencers alike.
          </Text>
        </Box>
        <Box>
          <Heading as="h2" size="lg">Our Founder</Heading>
          <Text fontSize="md" mt={4}>
            Founded by Omer Yildirim, a visionary developer and entrepreneur passionate about the intersection of technology and influencer culture, Vonsult is meticulously crafted to optimize digital interactions. Omer's comprehensive approach not only involves coding and design but also strategic planning and market analysis. His dedication ensures that Vonsult stands at the forefront of technological innovation and market trends, delivering a platform that meets the highest standards of performance and user experience.
          </Text>
        </Box>
        <Box>
          <Heading as="h2" size="lg">Vision and Impact</Heading>
          <Text fontSize="md" mt={4}>
            Vonsult transcends the traditional boundaries of a marketplace. We aim to empower influencers to monetize their expertise through a dynamic platform that also provides followers unprecedented access to personalized advice and mentorship. By fostering a thriving community of engaged users and content creators, Vonsult enhances the quality of digital interaction and community building. Our commitment to continuous improvement through analytics and user feedback makes our platform a crucial tool for influencers looking to expand their reach and deepen their impact.
          </Text>
        </Box>
        <Box mb={5}>
          <Heading as="h2" size="lg">Influencers: Join Our Platform</Heading>
          <Text fontSize="md" mt={4}>
            Elevate your impact and expand your reach by joining Vonsult. Our platform offers a unique opportunity for you to connect directly with your followers and monetize your expertise through personalized coaching sessions. Benefit from our integrated scheduling and payment systems that streamline your workflow, allowing you more time to focus on what you do best—creating inspiring content and engaging with your audience. Join a community of forward-thinking influencers who are leveraging Vonsult to enhance their interactions and grow their personal brand. Let's make a difference together.
          </Text>
          <Button colorScheme="teal" mt={4} onClick={() => navigate('/become-a-coach')}>Become A Coach</Button>
        </Box>
        
      </VStack>
    </Container>
  );
};

export default AboutPage;
