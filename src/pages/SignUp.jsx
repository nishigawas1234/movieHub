import { VStack ,HStack ,Text,Link} from '@chakra-ui/react'
import React from 'react'
import BasicForm from '../components/Forms/BasicForm'

export default function SignUp() {
    const signUpHandler =(values)=>{
        console.log(values,"values")
        window.location.href = "/login";
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
          <Link color="primary.500" fontSize="lg" fontWeight="normal" href="/login">
            Sign in
          </Link>
          </HStack>
        <BasicForm submitBtn={{label:"Sign Up" , handler: ()=>{signUpHandler()}}}/>
    </VStack>
  )
}
