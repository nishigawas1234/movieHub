import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from "./styles/theme.js";
import Home from './pages/Home';
import SideBar from './components/Common/SideBar';
import MyList from "./pages/MyList";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp.jsx';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ChakraProvider>
  );
}

function AppLayout() {
  const isSidebarVisible = !window.location.href.includes("/login") && !window.location.href.includes("/sign-in");

  return (
    <Box display="flex" h="100vh">
      {/* Sidebar */}
      {isSidebarVisible && <SideBar />}
      <Box
        as="main"
        flex="1"
        ml={{ base: 0, lg: isSidebarVisible ? "250px" : "0"}} // Adjust for different screen sizes
        p={{ base: 4, lg: 6 }}
        bg="primary.50"
        h="100%"
        overflowY="auto"
      >
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/sign-in" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/list" element={<MyList />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
