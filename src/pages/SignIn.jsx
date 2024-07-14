import { VStack, HStack, Text, Link } from "@chakra-ui/react";
import React from "react";
import BasicForm from "../components/Forms/BasicForm";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInUser } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import {getResigerUsers} from "../utils/HandleLocalStorange/registerUsers"
import { loggedinUser } from "../utils/HandleLocalStorange/userData";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signInHandler = (values) => {
   const  registerUsers = getResigerUsers()
     if(registerUsers.includes(values.username)){
      dispatch(setLoggedInUser(values.username));
      loggedinUser(values.username)
      navigate("/home");
     }else{
      alert("please register")
     }
   
  };
  return (
    <VStack m="auto" h="100%" justifyContent="center">
      <Text color="gray.500" fontSize="3xl" fontWeight="bold" mt="4">
        Welcome Back!
      </Text>
      <HStack mt="2" justifyContent="center">
        <Text color="gray.500" fontSize="lg" fontWeight="normal">
          Don’t have an account?
        </Text>
        <Link
          color="primary.500"
          fontSize="lg"
          fontWeight="normal"
          href="/sign-up"
        >
          Sign up
        </Link>
      </HStack>
      <BasicForm submitBtn={{ label: "Login", handler: signInHandler }} />
    </VStack>
  );
}
