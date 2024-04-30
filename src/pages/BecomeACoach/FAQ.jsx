import {
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Heading,
    Container,
  } from '@chakra-ui/react';
  
  function FAQSection() {
    const faqs = [
      {
        question: "What are my potential earnings?",
        answer: "Your earnings depend on the number of sessions you hold and the rates you set. The sky's the limit!",
      },
      {
        question: "Do I need to commit to a schedule?",
        answer: "Nope, you have complete flexibility to choose when you work. Your schedule, your rules.",
      },
      {
        question: "What's the average duration of a coaching session?",
        answer: "Typically, sessions range from 30 minutes to an hour, but you're welcome to customize as you see fit.",
      },
      {
        question: "How should I set my rates?",
        answer: "Consider the value of your time and expertise. We suggest starting with competitive rates and adjusting based on demand.",
      },
      {
        question: "Is there prep work involved for sessions?",
        answer: "Prepare as much or as little as you like. Some coaches offer off-the-cuff advice, while others provide more structured guidance.",
      },
      {
        question: "Can I connect with clients worldwide?",
        answer: "Absolutely! Vonsult is a global platform, so you can expand your reach internationally.",
      },
      {
        question: "Are there any fees to join Vonsult?",
        answer: "Joining Vonsult is free! We only take a small commission from your paid sessions.",
      },
    ];
  
    return (
      <Container maxW="container.md" py={12}>
        <Heading as="h3" size="lg" textAlign="center" mb={6}>
          Frequently Asked Questions
        </Heading>
        <Accordion allowToggle>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} border="0">
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: 'gray.200', color: 'black' }}
                      px={4}
                      py={2}
                    >
                      <Box flex="1" textAlign="left">
                        {faq.question}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} px={4} bg={isExpanded ? 'gray.100' : 'white'}>
                    {faq.answer}
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    );
  }
  
  export default FAQSection;
  