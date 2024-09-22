import type { BathroomType } from "../../../backend/models/bathroomModel";
import { Box, Text, Heading, Wrap } from "@chakra-ui/react";
import FallbackBathroomCard from "../components/FallbackBathroomCard";
import { defer, useLoaderData, Await } from "react-router-dom";
import ErrorBoundary from "../loaders/ErrorBoundary";
import { Suspense, lazy } from "react";
const BathroomCard = lazy(() => import("../components/BathroomCard"));

export default function Index() {
  const bathrooms = useLoaderData();
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
      <Box className="pageWrapper">
        <Heading textAlign={"center"}>All bathrooms</Heading>
        <Wrap justify={"center"}>
          {bathrooms.map((bathroom, index) => (
            <ErrorBoundary
              fallback={<FallbackBathroomCard variation="index" />}
            >
              <Suspense fallback={<p>Loading...</p>}>
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
              </Suspense>
            </ErrorBoundary>
          ))}
        </Wrap>
      </Box>
    </>
  );
}
