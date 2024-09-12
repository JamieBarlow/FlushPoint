import { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

export default function BathroomShow() {
  const bathroom = useLoaderData() as BathroomType;
  const { id } = useParams();
  // const [bathroom, setBathroom] = useState<BathroomType | null>(null);
  const [genderAccess, setGenderAccess] = useState<string | null>(null);
  const [wheelchairAccess, setWheelchairAccess] = useState<string | null>(null);
  const [changingTable, setChangingTable] = useState<string | null>(null);
  const [changingLocation, setChangingLocation] = useState<string | null>(null);
  const [toiletPositions, setToiletPositions] = useState<string | null>(null);
  useEffect(() => {
    let gender, wheelchair, changing_table, changing_location, position;
    // Gender access
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

      // Wheelchair access
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
      } else {
        switch (bathroom.tags.wheelchair) {
          case "no":
            wheelchair = "No unrestricted building access (stairs only)";
            break;
          case "limited":
            wheelchair = "Partial/limited access";
            break;
          case "designated":
            wheelchair = "Designated (e.g. elevator)";
            break;
          default:
            wheelchair = "Unknown";
        }
      }
      setWheelchairAccess(wheelchair);

      // Changing table access
      if (bathroom.tags.changing_table) {
        changing_table = bathroom.tags.changing_table;
      } else {
        changing_table = "Unknown";
      }
      setChangingTable(changing_table);
      switch (bathroom.tags["changing_table:location"]) {
        case "wheelchair_toilet":
          changing_location = "Wheelchair toilet";
          break;
        case "female_toilet":
          changing_location = "Female toilet";
          break;
        case "male_toilet":
          changing_location = "Male toilet";
          break;
        case "unisex_toilet":
          changing_location = "Unisex toilet";
          break;
        case "dedicated_room":
          changing_location = "Dedicated room";
          break;
        case "room":
          changing_location = "Multi-purpose rom";
          break;
        default:
          changing_location = "Unknown";
      }
      setChangingLocation(changing_location);

      // Toilet position options.
      if (bathroom.tags["toilets:position"]) {
        setToiletPositions(bathroom.tags["toilets:position"]);
      }
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
                <Text sx={dataText}>{genderAccess}</Text>
                {genderAccess === "Unknown" && <Button>Add info</Button>}
              </Box>

              <Box>
                <Text sx={dataHeader}>Wheelchair?</Text>
                <Text sx={dataText}>{wheelchairAccess}</Text>
                {wheelchairAccess === "Unknown" && <Button>Add info</Button>}
                {bathroom.tags["wheelchair:description"] && (
                  <>
                    <Text sx={dataHeader}>Wheelchair info</Text>
                    <Text sx={dataText}>
                      {bathroom.tags["wheelchair:description"]}
                    </Text>
                  </>
                )}
              </Box>
              <Box>
                <Text sx={dataHeader}>Changing Table?</Text>
                <Text sx={dataText}>{changingTable}</Text>
                {changingTable === "Unknown" && <Button>Add info</Button>}
              </Box>
              {changingTable !== "Unknown" && (
                <Box>
                  <Text sx={dataHeader}>Table location</Text>
                  <Text sx={dataText}>{changingLocation}</Text>
                  {changingLocation === "Unknown" && <Button>Add info</Button>}
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
              {toiletPositions && (
                <Box>
                  <Text sx={dataHeader}>Toilet positions</Text>
                  <Text sx={dataText}>{toiletPositions}</Text>
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
