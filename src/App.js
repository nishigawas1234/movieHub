import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from "./styles/theme.js";
import Home from './pages/Home';
import SideBar from './components/Common/SideBar';
import MyList from "./pages/MyList";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp.jsx';
import { Provider } from "react-redux";
import store from "./redux/store.js";

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
  const location = useLocation();
  const isSidebarVisible = !(location.pathname === "/" || location.pathname === "/sign-up");

  return (
    <Provider store={store}>
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
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/list" element={<MyList />} />
        </Routes>
      </Box>
    </Box>
    </Provider>
  );
}

export default App;
