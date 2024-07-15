import { Container } from "@chakra-ui/react";
import React from "react";
import {
  
  Box,
  Flex,
  Button,
  Spacer,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().email("Invalid email address").required("Required"),
});

const initialValues = {
  username: "",
};

export default function BasicForm({ submitBtn }) {
  return (
    <Container>
      <Box w="full">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            submitBtn.handler(values);

            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Flex flexDir="column" h="full" w="full">
                <Box pb="5" pt={5}>
                  <Field name="username">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          !!form.errors.username && !!form.touched.username
                        }
                      >
                        <FormLabel htmlFor="username" color="gray.500">
                          Email
                        </FormLabel>
                        <Input
                          {...field}
                          id="username"
                          placeholder="abc@gmail.com"
                          type="email"
                          background="#fff"
                          border="1px solid #111111"
                          color="gray.500"
                          _placeholder={{
                            fontSize: "md",
                            color: "gray.200",
                          }}
                          _active={{
                            bg: "contrast.100",
                            bordder: "1px solid #111111",
                          }}
                          _hover={{
                            bg: "contrast.100",
                            bordder: "1px solid #111111",
                          }}
                          _focus={{
                            boxShadow: "none",
                            bordder: "1px solid #111111",
                          }}
                        />
                        <FormErrorMessage>
                          {typeof form.errors.username === "string" &&
                            form.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>

                <Spacer />
                <Box px={0} py={4}>
                  <Button
                    type="submit"
                    bg="primary.500"
                    isLoading={isSubmitting}
                    colorScheme="primary.500"
                    w="full"
                  >
                    {submitBtn.label}
                  </Button>
                </Box>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
