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
    AspectRatio,
    chakra
  } from '@chakra-ui/react';
import benefit1 from '../../assets/benefit1.jpg';
import benefit2 from '../../assets/benefit2.jpg';
import benefit3 from '../../assets/benefit3.jpg';
  
  function Benefits() {
    // Determine the image's display side based on the index
    const isImageLeft = (index) => index % 2 === 0;
  
    const benefits = [
      {
        title: "Effortless Start",
        text: "Craft your personal brand effortlessly by uploading your picture and unique bio. We handle the technical side, so your focus remains on growing your influence.",
        imgSrc: benefit1, // Replace with actual image path
      },
      {
        title: "Flexible Earnings",
        text: "Define your worth. With Vonsult, you're in control of your rates and schedule, ensuring that your talent is rightly valued.",
        imgSrc: benefit2, // Replace with actual image path
      },
      {
        title: "Simple Sharing",
        text: "Amplify your reach with your personal link. Embed it on your blog, bio, or email and watch your community thrive through direct engagements.",
        imgSrc: benefit3, // Replace with actual image path
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
    
    // This will now be 100% of the container on small screens, and a specific larger pixel value on wider screens.
    const imageBoxSize = useBreakpointValue({ base: '100%', md: '400px' }); // Increased from 350px to 400px for medium and larger screens
  
    // Adjust the aspect ratio to make the image a touch wider. A lower ratio means a wider image.
    const aspectRatio = 16 / 9; // This is a common aspect ratio for widescreen images
  
    return (
      <Flex
        direction={direction}
        justify="center"
        align="center"
        wrap="no-wrap"
        my={10}
      >
        <AspectRatio ratio={aspectRatio} w={imageBoxSize}>
          <Image
            borderRadius="lg"
            src={imgSrc}
            alt={title}
            objectFit="cover"
          />
        </AspectRatio>
        <Box flex="1" px={{ base: 4, md: 8 }}>
          <Heading size="lg" mb={3}>{title}</Heading>
          <Text fontSize="md" mb={4}>{text}</Text>
        </Box>
      </Flex>
    );
  }
  
  
  
  export default Benefits;
  