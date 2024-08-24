import type { BathroomType } from "../../../backend/models/bathroomModel";
import dbUrl from "../../../backend/routes/index";
import {
  Flex,
  Box,
  Text,
  Heading,
  Wrap,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import BathroomCard from "../components/BathroomCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Box className="pageWrapper">
        <Heading textAlign={"center"}>Home page</Heading>
      </Box>
      <Footer />
    </>
  );
}
