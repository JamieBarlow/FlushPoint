import type { BathroomType } from "../../../backend/models/bathroomModel";
import {
  Box,
  Text,
  Heading,
  Stack,
  StackDivider,
  Button,
} from "@chakra-ui/react";
import BathroomCard from "../components/BathroomCard";
import { useLoaderData } from "react-router-dom";

export default function BathroomShow() {
  const bathroom = useLoaderData() as BathroomType;

  let gender, changing_table, changing_locations;
  // Gender access display
  if (bathroom) {
    if (bathroom.tags.gender_segregated === "no") {
      gender = "Unisex (gender neutral)";
    } else if (bathroom.tags.gender_segregated === "yes") {
      gender = "Male and female (gender segregated)";
    } else if (bathroom.tags.male === "yes") {
      gender = "Male only";
    } else if (bathroom.tags.female === "yes") {
      gender = "Female only";
    } else {
      gender = "Unknown";
    }
  }

  // Changing table access
  if (bathroom.tags.changing_table) {
    changing_table = bathroom.tags.changing_table;
  } else {
    changing_table = "Unknown";
  }

  // Changing table location
  changing_locations = bathroom.tags["changing_table:location"]
    .split(";")
    .map((str) => str.split("_").join(" "))
    .join(", ");

  const addressBox = {
    bg: "black",
    display: "inline-block",
    px: 2,
    py: 1,
    color: "white",
    mb: 2,
  };
  const dataHeader = {
    color: "gray.500",
    fontWeight: "bold",
    // display: "inline",
    mr: "2",
  };
  const dataText = {
    display: "inline",
    mr: "2",
  };

  return (
    <>
      <Box className="pageWrapper" py="40px">
        {bathroom && (
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
              <Box>
                <Text sx={dataHeader}>Operated by:</Text>
                <Text sx={dataText}>{bathroom.tags.operator}</Text>
              </Box>
            </Box>
            <Box className="bathroom__openingHours" p={4}>
              <Text color={"gray.500"}>{bathroom.tags.opening_hours}</Text>
            </Box>
            <Stack
              className="bathroom__accessibility"
              p={4}
              divider={<StackDivider borderColor="gray.200" />}
              direction="row"
              align="center"
            >
              <Box>
                <Text sx={dataHeader}>Fee?</Text>
                <Text sx={dataText}>{bathroom.tags.fee}</Text>
              </Box>
              <Box>
                <Text sx={dataHeader}>Gender Access?</Text>
                <Text sx={dataText}>{gender}</Text>
                {gender === "Unknown" && <Button>Add info</Button>}
              </Box>

              <Box>
                <Text sx={dataHeader}>Wheelchair (building)</Text>
                <Text sx={dataText}>{bathroom.tags.wheelchair}</Text>
                {bathroom.tags.wheelchair === "Unknown" && (
                  <Button>Add info</Button>
                )}
              </Box>
              <Box>
                <Text sx={dataHeader}>Wheelchair (toilet)</Text>
                <Text sx={dataText}>{bathroom.tags["toilets:wheelchair"]}</Text>
                {bathroom.tags["toilets:wheelchair"] === "Unknown" && (
                  <Button>Add info</Button>
                )}
              </Box>
              {bathroom.tags["wheelchair:description"] && (
                <Box>
                  <Text sx={dataHeader}>Wheelchair info</Text>
                  <Text sx={dataText}>
                    {bathroom.tags["wheelchair:description"]}
                  </Text>
                </Box>
              )}
              <Box>
                <Text sx={dataHeader}>Changing Table?</Text>
                <Text sx={dataText}>{changing_table}</Text>
                {changing_table === "Unknown" && <Button>Add info</Button>}
              </Box>
              {changing_table !== "Unknown" && (
                <Box>
                  <Text sx={dataHeader}>Table location(s)</Text>
                  <Text sx={dataText}>{changing_locations}</Text>
                  {changing_locations === "Unknown" && (
                    <Button>Add info</Button>
                  )}
                </Box>
              )}
            </Stack>
            <Stack
              className="bathroom_accessibility"
              p={4}
              divider={<StackDivider borderColor="gray.200" />}
              direction="row"
              align="center"
            >
              {bathroom.tags["toilets:position"] && (
                <Box>
                  <Text sx={dataHeader}>Toilet positions</Text>
                  <Text sx={dataText}>{bathroom.tags["toilets:position"]}</Text>
                </Box>
              )}
              {bathroom.tags.access && (
                <Box>
                  <Text sx={dataHeader}>Access</Text>
                  <Text sx={dataText}>{bathroom.tags.access}</Text>
                </Box>
              )}
              {bathroom.tags.level && (
                <Box>
                  <Text sx={dataHeader}>Floor</Text>
                  <Text sx={dataText}>{bathroom.tags.level}</Text>
                </Box>
              )}
              {bathroom.tags.shower && (
                <Box>
                  <Text sx={dataHeader}>Shower?</Text>
                  <Text sx={dataText}>{bathroom.tags.shower}</Text>
                </Box>
              )}
              {bathroom.tags.child && (
                <Box>
                  <Text sx={dataHeader}>Seats / urinals for children?</Text>
                  <Text sx={dataText}>{bathroom.tags.child}</Text>
                </Box>
              )}
            </Stack>
            <Stack
              className="bathroom__updated"
              p={4}
              divider={<StackDivider borderColor="gray.200" />}
              direction="row"
              align="center"
            >
              <Box>
                <Text sx={dataHeader}>Last Updated:</Text>
                <Text sx={dataText}>{bathroom.tags.check_date}</Text>
              </Box>
            </Stack>
          </BathroomCard>
        )}
      </Box>
    </>
  );
}
