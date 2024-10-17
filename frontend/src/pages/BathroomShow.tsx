import type { BathroomType, Tags } from "../../../backend/models/bathroomModel";
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

interface DataDisplayProps {
  data: string | number | undefined;
  header: string;
  addInfo?: boolean;
}

const DataDisplay = ({
  data,
  header,
  addInfo,
}: DataDisplayProps): JSX.Element => {
  console.log(data);
  return (
    <Box>
      <Text sx={dataHeader}>{header}</Text>
      {data ? (
        <Text sx={dataText}>{data}</Text>
      ) : (
        addInfo && (
          <>
            <Text>Unknown</Text>
            <Button>Add Info</Button>
          </>
        )
      )}
    </Box>
  );
};

export default function BathroomShow() {
  const bathroom = useLoaderData() as BathroomType;

  let gender: keyof Tags | string | undefined,
    changing_table,
    changing_locations,
    toilet_positions,
    public_access;
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
      gender = undefined;
    }
  }
  // Access to public
  if (bathroom) {
    if (bathroom.tags.access === "yes") {
      public_access = "Yes";
    } else if (bathroom.tags.access === "customers") {
      public_access = "Customers Only";
    } else {
      public_access = undefined;
    }
  }

  // Convert multiple checkbox options (formatted with a dividing ";") to comma and space-separated display
  function convertMulti(tag: string) {
    if (tag) {
      return tag
        .split(";")
        .map((str) => str.split("_").join(" "))
        .join(", ");
    } else {
      return "unknown";
    }
  }

  // Changing table location
  changing_locations = convertMulti(bathroom.tags["changing_table:location"]);
  toilet_positions = convertMulti(bathroom.tags["toilets:position"]);

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
              <DataDisplay
                data={bathroom.tags.operator}
                header="Operated By:"
              />
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
              <DataDisplay
                data={public_access}
                header="Access"
                addInfo={true}
              />
              <DataDisplay
                data={bathroom.tags.fee}
                header="Fee?"
                addInfo={true}
              />
              <DataDisplay
                data={gender}
                header="Gender Access?"
                addInfo={true}
              />
              <DataDisplay
                data={bathroom.tags.wheelchair}
                header="Wheelchair (building)"
                addInfo={true}
              />
              <DataDisplay
                data={bathroom.tags["toilets:wheelchair"]}
                header="Wheelchair (toilet)"
                addInfo={true}
              />
              {bathroom.tags["wheelchair:description"] && (
                <DataDisplay
                  data={bathroom.tags["wheelchair:description"]}
                  header="Wheelchair info"
                  addInfo={true}
                />
              )}

              <DataDisplay
                data={bathroom.tags.changing_table}
                header="Changing Table?"
                addInfo={true}
              />
              {changing_table && (
                <DataDisplay
                  data={changing_locations}
                  header="Table location(s)"
                  addInfo={true}
                />
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
                <DataDisplay
                  data={toilet_positions}
                  header="Toilet positions"
                  addInfo={true}
                />
              )}
              {bathroom.tags.level && (
                <DataDisplay
                  data={bathroom.tags.level}
                  header="Floor"
                  addInfo={true}
                />
              )}
              {bathroom.tags.shower && (
                <DataDisplay
                  data={bathroom.tags.shower}
                  header="Shower?"
                  addInfo={true}
                />
              )}
              {bathroom.tags.child && (
                <DataDisplay
                  data={bathroom.tags.child}
                  header="Seats / urinals for children?"
                  addInfo={true}
                />
              )}
              {bathroom.tags.drinking_water && (
                <DataDisplay
                  data={bathroom.tags.drinking_water}
                  header="Drinking water?"
                  addInfo={true}
                />
              )}
              <DataDisplay
                data={bathroom.tags["toilets:menstrual_products"]}
                header="Menstrual products?"
                addInfo={true}
              />
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
