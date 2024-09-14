import { Box, Heading, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import PageLayout from "../layout/PageLayout";

export default function NotFound() {
  return (
    <PageLayout>
      <Box py="60px">
        <Heading>Page not found!</Heading>
        <Text>Looks like this page doesn't exist.</Text>
        <ChakraLink as={ReactRouterLink} to="/">
          Back to Home
        </ChakraLink>
      </Box>
    </PageLayout>
  );
}
