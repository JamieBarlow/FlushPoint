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

export default function HomePage() {
  const [bathrooms, setBathrooms] = useState<BathroomType[]>([]);
  useEffect(() => {
    fetch("http://localhost:8000/bathrooms")
      .then((response) => response.json())
      .then((data) => setBathrooms(data));
  }, []);
  return (
    <>
      <Navbar />
      <Box className="pageWrapper">
        <Heading textAlign={"center"}>All bathrooms</Heading>
        <Wrap justify={"center"}>
          {bathrooms.map((bathroom, index) => (
            <BathroomCard bathroom={bathroom} key={index} />
          ))}
        </Wrap>
      </Box>
    </>
  );
}
