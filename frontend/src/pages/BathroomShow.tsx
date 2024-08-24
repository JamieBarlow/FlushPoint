import { useState, useEffect } from "react";
import type { BathroomType } from "../../../backend/models/bathroomModel";
import dbUrl from "../../../backend/routes/index";
import {
  Flex,
  Box,
  Text,
  Heading,
  Wrap,
  Stack,
  StackDivider,
  Button,
} from "@chakra-ui/react";
import BathroomCard from "../components/BathroomCard";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BathroomShow() {
  const { id } = useParams();
  const [bathroom, setBathroom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genderAccess, setGenderAccess] = useState(null);
  const [wheelchairAccess, setWheelchairAccess] = useState(null);
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
    let gender, wheelchair;
    if (bathroom) {
      if (bathroom.tags.unisex === "yes") {
        gender = "Unisex (gender neutral)";
      } else if (bathroom.tags.male === "yes") {
        gender = "Male only";
      } else if (bathroom.tags.female === "yes") {
        gender = "Female only";
      } else if (
        bathroom.tags.male === "yes" &&
        bathroom.tags.female === "yes"
      ) {
        // Accounting for user error - "yes" should mean exclusive to that gender
        gender = "Gender segregated";
      } else {
        gender = "Unknown";
      }
      setGenderAccess(gender);
      if (
        bathroom.tags.wheelchair === "yes" &&
        bathroom.tags["toilets:wheelchair"] === "no"
      ) {
        wheelchair = "Building access only";
      } else if (
        bathroom.tags.wheelchair === "yes" &&
        bathroom.tags["toilets:wheelchair"] === "yes"
      ) {
        wheelchair = "Building and toilet access";
      } else if (bathroom.tags.wheelchair === "no") {
        wheelchair = "No unrestricted building access (stairs only)";
      } else if (bathroom.tags.wheelchair === "limited") {
        wheelchair = "Partial/limited access";
      } else if (bathroom.tags.wheelchair === "designated") {
        wheelchair = "Designated (e.g. elevator)";
      } else {
        wheelchair = "Unknown";
      }
      setWheelchairAccess(wheelchair);
    }
  }, [bathroom]);

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
      <Box className="pageWrapper" py="40px">
        {bathroom ? (
          <>
            <Heading textAlign={"center"}>Show bathroom</Heading>
            <BathroomCard bathroom={bathroom}>
              <Box className="bathroom__main" p={4}>
                <Box sx={addressBox}>
                  <Text fontSize={"xs"} fontWeight="medium">
                    {bathroom.tags["addr:street"]}
                  </Text>
                </Box>
                <Heading color={"black"} fontSize={"2xl"} noOfLines={3}>
                  {bathroom.tags.name}
                </Heading>
                <Text color={"gray.500"}>{bathroom.tags.description}</Text>
              </Box>
              <Box className="bathroom__openingHours" p={4}>
                <Text color={"gray.500"}>{bathroom.tags.opening_hours}</Text>
              </Box>
              <Box className="bathroom__accessibility" p={4}>
                <Text color={"gray.500"}>Fee? {bathroom.tags.fee}</Text>
                <Text color={"gray.500"}>Gender Access? {genderAccess}</Text>
                {genderAccess === "Unknown" && <Button>Add info</Button>}
                <Text color={"gray.500"}>
                  Last Updated: {bathroom.tags.check_date}
                </Text>
                <Text color={"gray.500"}>Wheelchair: {wheelchairAccess}</Text>
                {wheelchairAccess === "Unknown" && <Button>Add info</Button>}
                <Text color={"gray.500"}>
                  {bathroom.tags["wheelchair:description"]}
                </Text>
              </Box>
            </BathroomCard>
          </>
        ) : null}
      </Box>
      <Footer />
    </>
  );
}
