import {
    Box,
    Flex,
    Image,
    Text,
    Heading,
    VStack,
    HStack,
    useBreakpointValue,
    Container,
    chakra
  } from '@chakra-ui/react';
  
  function Benefits() {
    // Determine the image's display side based on the index
    const isImageLeft = (index) => index % 2 === 0;
  
    const benefits = [
      {
        title: "Effortless Start",
        text: "Craft your personal brand effortlessly by uploading your picture and unique bio. We handle the technical side, so your focus remains on growing your influence.",
        imgSrc: "path/to/start-earning-image.jpg", // Replace with actual image path
      },
      {
        title: "Flexible Earnings",
        text: "Define your worth. With Vonsult, you're in control of your rates and schedule, ensuring that your talent is rightly valued.",
        imgSrc: "path/to/set-price-image.jpg", // Replace with actual image path
      },
      {
        title: "Simple Sharing",
        text: "Amplify your reach with your personal link. Embed it on your blog, bio, or email and watch your community thrive through direct engagements.",
        imgSrc: "path/to/share-link-image.jpg", // Replace with actual image path
      },
    ];
  
    return (
        <Container maxW="container.xl" py={12}>
            <Heading as="h2" size="xl" textAlign="center" mb={10}>
            Why Become a Coach?
            </Heading>
            <VStack spacing={10}>
                {benefits.map((benefit, index) => (
                <BenefitItem
                    key={index}
                    title={benefit.title}
                    text={benefit.text}
                    imgSrc={benefit.imgSrc}
                    isImageLeft={isImageLeft(index)}
                />
                ))}
            </VStack>
        </Container>
    );
  }
  
  function BenefitItem({ title, text, imgSrc, isImageLeft }) {
    const direction = useBreakpointValue({ base: 'column', md: isImageLeft ? 'row' : 'row-reverse' });
    
    return (
      
      
      <Flex
        direction={direction}
        justify="center"
        align="center"
        wrap="no-wrap"
      >
        
        <Box flex="1" mb={{ base: 4, md: 0 }}>
          <Image
            borderRadius="lg"
            src={imgSrc}
            alt={title}
            maxH="300px"
            objectFit="cover"
          />
        </Box>
        <Box flex="1" px={{ base: 4, md: 8 }}>
          <Heading size="lg" mb={3}>{title}</Heading>
          <Text fontSize="md" mb={4}>{text}</Text>
        </Box>
      </Flex>
    );
  }
  
  export default Benefits;
  