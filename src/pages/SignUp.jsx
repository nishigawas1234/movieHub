import { VStack ,HStack ,Text,Link} from '@chakra-ui/react'
import React from 'react'
import BasicForm from '../components/Forms/BasicForm'
import {registerUser } from "../utils/HandleLocalStorange/registerUsers"
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
    const signUpHandler =(values)=>{
        registerUser(values.username)
        navigate("/");
    }
  return (
    <VStack m="auto" h="100%" justifyContent="center">
       <Text color="gray.500" fontSize="3xl" fontWeight="bold" mt="4">
          Welcome!
        </Text>
        <HStack mt="2" justifyContent="center">
          <Text color="gray.500" fontSize="lg" fontWeight="normal">
          Already have an account?
          </Text>
          <Link color="primary.500" fontSize="lg" fontWeight="normal" href="/">
            Sign in
          </Link>
          </HStack>
        <BasicForm submitBtn={{label:"Sign Up" , handler: signUpHandler}}/>
    </VStack>
  )
}
