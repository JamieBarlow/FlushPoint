import { useState, useEffect } from "react";
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

export default function Index() {
  const [bathrooms, setBathrooms] = useState<BathroomType[]>([]);
  useEffect(() => {
    fetch("http://localhost:8000/bathrooms")
      .then((response) => response.json())
      .then((data) => setBathrooms(data));
  }, []);
  const addressBox = {
    bg: "black",
    display: "inline-block",
    px: 2,
    py: 1,
    color: "white",
    mb: 2,
  };
  return (
    <>
      <Navbar />
      <Box className="pageWrapper">
        <Heading textAlign={"center"}>All bathrooms</Heading>
        <Wrap justify={"center"}>
          {bathrooms.map((bathroom, index) => (
            <BathroomCard
              bathroom={bathroom}
              variation="index"
              key={index}
              index={index}
            >
              <Box p={4}>
                <Box sx={addressBox}>
                  <Text fontSize={"xs"} fontWeight="medium">
                    {bathroom.tags["addr:street"]}
                  </Text>
                </Box>
                <Heading color={"black"} fontSize={"2xl"} noOfLines={3}>
                  {bathroom.tags.name}
                </Heading>
                <Text color={"gray.500"} noOfLines={2}>
                  {bathroom.tags.description}
                </Text>
              </Box>
              <Box p={4}>
                <Text color={"gray.500"} noOfLines={4}>
                  {bathroom.tags.opening_hours}
                </Text>
              </Box>
            </BathroomCard>
          ))}
        </Wrap>
      </Box>
      <Footer />
    </>
  );
}
