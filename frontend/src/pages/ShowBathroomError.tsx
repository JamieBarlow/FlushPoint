import {
  Link as ReactRouterLink,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";
import { Box, Heading, Text, Link as ChakraLink } from "@chakra-ui/react";

export default function ShowBathroomError() {
  // Handle error message w types
  let errorMessage;
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "Unknown error";
  }
  return (
    <Box py="60px">
      <Heading>Bathroom not found!</Heading>
      <Text>Error: {errorMessage}</Text>
      <ChakraLink as={ReactRouterLink} to="/bathrooms">
        Back to Bathrooms
      </ChakraLink>
    </Box>
  );
}
