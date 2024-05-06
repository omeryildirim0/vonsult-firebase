import React, { useState } from "react";
import { Flex, Box, Center, Heading, Stack } from "@chakra-ui/react";
import CoachCard from "./CoachCard"; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import omerImage from './coachAssets/omer.jpg';
import cecilieImage from './coachAssets/cecilie.jpeg';
import jennaImage from './coachAssets/jenna.jpeg';

const CoachCarousel = React.forwardRef((props, ref) => {
  const navigate = useNavigate();

  const handleCardClick = (coachId) => {
    navigate(`/coach/${coachId}`);
  };

  // Example hardcoded data
  const hardcodedCoaches = [
    {
      id: 'U7gtNlVwUgRk7U9tBjP54tLdJLn2',
      fullName: 'Cecilie Moessle',
      bio: 'My name is Cecilie, I am 25 years old and I am a content creator. I have been working with social media for 4 years now whether it was my own account or a brand’s account. Through hard work and a lot of research I have mastered the game of social media growth and grew my account up to 50K followers, so I am here to help you. But what can you learn from me? I talk about how to get viral, what to look for to achieve the best results, how to grow a community and much more. I cannot wait to work with you and see your success.',
      profilePicURL: cecilieImage,
      hourlyRate: '90'
    },
    {
      id: 'rq10VzBTpobFKCCjhm8Or3lkhSn1',
      fullName: 'Omer Yildirim',
      bio: 'Law student turned entrepreneur. Founder of this app. Vonsult is more than just a platform; it is a testament to my belief in the power of dialogue, mentorship, and the exchange of ideas across disciplines. By facilitating one-on-one sessions with renowned experts from various fields, I aim to empower individuals to seek answers, challenge conventions, and pursue their passions with confidence.',
      profilePicURL: omerImage,
      hourlyRate: '100'
    },
    {
      id: 'z3wZeF0KVneNYLemioBYkVsOBUs2',
      fullName: 'Jenna Robins',
      bio: 'My name is Jenna and I am a content-creator, business owner and new-mom from Toronto, Canada! I started my social media journey on Instagram in 2018, and have recently expanded to TikTok. I now have a highly engaged following of 64k! I love creating organic photo and video content that focuses on travel (i.e., what to do, where to eat, where to stay, etc.), home (i.e., DIY projects, home inspiration, must-have products, etc.) and life as new parents (i.e., daily vlogs, baby products, etc.) I am grateful to have had the opportunity to work with a variety of different businesses and look forward to establishing more authentic partnerships in the future.',
      profilePicURL: jennaImage,
      hourlyRate: '90'
    }
  ];

  const [coaches] = useState(hardcodedCoaches);

  return (
    <Center ref={ref} w="full" mt="4">
      <Stack spacing={4} align="center" w="full">
        <Heading as="h2" size="xl" textAlign="center"
          bgClip="text"
          fontWeight="bold"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          color="transparent"
        >
          Top Influencers at Your Fingertips
        </Heading>
        <Flex
          direction="row"
          overflowX="auto"
          wrap="nowrap"
          justifyContent="space-around" // Distributes space around items
          align="center"
          w="full"
        >


          {coaches.map(coach => (
            <Box key={coach.id} mx="2">
              <CoachCard 
                name={coach.fullName} 
                bio={coach.bio} 
                imageUrl={coach.profilePicURL} 
                hourlyRate={coach.hourlyRate}
                onClick={() => handleCardClick(coach.id)}
              />
            </Box>
          ))}
        </Flex>
      </Stack>
    </Center>
  );
});

export default CoachCarousel;
