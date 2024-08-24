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
import { useParams } from "react-router-dom";
import BathroomCard from "../components/BathroomCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BathroomShow() {
  const { id } = useParams();
  const [bathroom, setBathroom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchBathroom = async () => {
      try {
        const response = await fetch(`http://localhost:8000/bathrooms/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch bathroom data");
        }
        const data = await response.json();
        setBathroom(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBathroom();
  }, [id]);
  useEffect(() => {
    console.log(bathroom);
  }, [bathroom]);
  return (
    <>
      <Navbar />
      <Box className="pageWrapper" py="40px">
        {bathroom ? (
          <>
            <Heading textAlign={"center"}>Show bathroom</Heading>
            <Text>{bathroom.tags.name}</Text>
          </>
        ) : null}
      </Box>
      <Footer />
    </>
  );
}
