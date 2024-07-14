import { VStack ,HStack ,Text,Link} from '@chakra-ui/react'
import React from 'react'
import BasicForm from '../components/Forms/BasicForm'

export default function SignIn() {
    const signInHandler =(values)=>{
        console.log(values,"values")
        window.location.href = "/home";
    }
  return (
    <VStack m="auto" h="100%" justifyContent="center">
       <Text color="contrast.100" fontSize="3xl" fontWeight="bold" mt="4">
          Welcome Back!
        </Text>
        <HStack mt="2" justifyContent="center">
          <Text color="contrast.100" fontSize="lg" fontWeight="normal">
            Don’t have an account?
          </Text>
          <Link color="primary.500" fontSize="lg" fontWeight="normal" href="/sign-up">
            Sign up
          </Link>
          </HStack>
          <BasicForm submitBtn={{label:"Login" , handler: signInHandler}}/>
    </VStack>
  )
}
