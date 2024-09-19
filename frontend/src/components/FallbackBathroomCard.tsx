import {
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

interface fallbackProps {
  index?: number;
  variation?: string;
}

export default function FallbackBathroomCard({ variation }: fallbackProps) {
  const containerStyles = {
    rounded: "sm",
    my: "5",
    mx: [0, 5],
    overflow: "hidden",
    bg: "white",
    border: "1px",
    borderColor: "black",
    boxShadow: useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan"),
  };
  const linkBox = {
    p: "4",
    alignItems: "center",
    justifyContent: "space-between",
    roundedBottom: "sm",
    cursor: "pointer",
    w: "full",
    ":hover": {
      color: "blue",
    },
  };
  const addressBox = {
    bg: "black",
    display: "inline-block",
    px: 2,
    py: 1,
    color: "white",
    mb: 2,
  };
  return (
    <Center py={6}>
      <Box sx={containerStyles} w={variation === "index" ? "xs" : ""}>
        <Box
          className="bathroom__previewImg"
          h={"200px"}
          borderBottom={"1px"}
          borderColor="black"
        >
          <Img
            src={
              "https://images.unsplash.com/photo-1609743522653-52354461eb27?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            roundedTop={"sm"}
            objectFit="cover"
            objectPosition={"50% 80%"}
            h="full"
            w="full"
            alt={"Bathroom Image"}
          />
        </Box>
        {variation === "index" ? (
          <>
            <Box p={4}>
              <Box sx={addressBox}>
                <Text fontSize={"xs"} fontWeight="medium">
                  Sorry!
                </Text>
              </Box>
              <Heading color={"black"} fontSize={"2xl"} noOfLines={3}>
                Bathroom not found
              </Heading>
              <Text color={"gray.500"} noOfLines={2}>
                An error prevented this item from loading.
              </Text>
            </Box>
            <Box p={4}>
              <Text color={"gray.500"} noOfLines={4}></Text>
            </Box>
          </>
        ) : null}
      </Box>
    </Center>
  );
}
