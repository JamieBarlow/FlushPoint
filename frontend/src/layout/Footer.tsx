import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaToiletsPortable,
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <Box bg={"blue.100"} color={useColorModeValue("gray.700", "gray.200")}>
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <FaToiletsPortable />
        <Stack direction={"row"} spacing={6}>
          <Box as="a" href={"#"}>
            Home
          </Box>
          <Box as="a" href={"#"}>
            About
          </Box>
          <Box as="a" href={"#"}>
            Blog
          </Box>
          <Box as="a" href={"#"}>
            Contact
          </Box>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© 2024 Jamie Barlow. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <FaTwitter />
            <FaYoutube />
            <FaInstagram />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
