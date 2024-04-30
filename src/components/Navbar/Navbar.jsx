
import { Link as RouterLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
  Stack,
  IconButton,
  useBreakpointValue,
  Collapse,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  MenuDivider
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Image as ChakraImage } from '@chakra-ui/react';
import useLogout from "../../hooks/useLogout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebase/firebase';
import logo from '../../assets/Vonsult.svg';


const Navbar = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.600', 'white');
  const [isMobileNavOpen, setMobileNavOpen] = React.useState(false);
  const navigate = useNavigate();
  const { handleLogout, isLoggingOut } = useLogout();
  const [authUser] = useAuthState(auth);
  const userDoc = JSON.parse(localStorage.getItem("user-info"));

  // This will determine if we're on a mobile device based on the breakpoint
  // const isMobile = useBreakpointValue({ base: true, md: false });

  const onDashboardClick = () => {
    // Navigate to the user's dashboard page
    navigate('/dashboard');
  };


  return (
    <Flex
      align="center"
      justify="space-between"
      bg={bgColor}
      color={color}
      py={2}
      px={4}
      position="sticky" // Make navbar sticky
      top="0" // Stick to the top of the viewport
      zIndex="1000" // Ensure it's above other content
      boxShadow="sm" // Optional: adds a subtle shadow to the navbar
    >
      <Flex align="center">
        
      <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
            <ChakraImage 
              src={logo}
              alt="Vonsult Logo"
              // Set the max height of the logo to fit your navbar
              maxH="50px" // Increased height
              maxW="130px" // Increased width, if necessary
             
            />
        </Link>
      </Flex>

      {/* Mobile Menu Button 
        {isMobile && (
        <IconButton
          icon={isMobileNavOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={() => setMobileNavOpen(!isMobileNavOpen)}
          variant="outline"
          aria-label="Toggle Navigation"
        />
        }
      
      */}
      

      {/* Navigation Links */}
      <Box
        display={{ base: isMobileNavOpen ? "block" : "none", md: "flex" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Stack
          spacing={8}
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          {/* Add your links here 
            <Text cursor="pointer">How it Works</Text> 
            <Text cursor="pointer"
              onClick={() => navigate('/become-a-coach')}
            >Become a Coach</Text>
            <Text cursor="pointer">Blog</Text> 
            comments
          */}
         
        </Stack>
      </Box>

      {/* Auth Buttons */}
      <Flex
        align="center"
        display={{ base:'flex', md: 'flex' }}
      >
        {authUser ? (
          <Menu>
            <MenuButton as={Button} colorScheme="blue" rightIcon={<ChevronDownIcon />}>
              {authUser.email || 'User'} 
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onDashboardClick}>Dashboard</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <>
            <Button 
              colorScheme="blue" 
              variant="ghost" 
              mr={3} 
              onClick={() => navigate('/coachesinfo')}
              display={{ base: 'none', md: 'inline-flex' }}
            >
              Become a Coach
            </Button>
            <Button 
              colorScheme="blue" 
              
              onClick={() => navigate('/sign-in')}
            >
              Sign In
            </Button>
        
          </>
        )}
        
      </Flex>
    </Flex>
  );
};

export default Navbar;
