import {
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  Box,
  Stack,
  StackDivider,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";
import { BathroomType } from "../../../backend/models/bathroomModel";

interface BathroomProps {
  bathroom: BathroomType;
  index?: number;
  variation?: string;
  children: React.ReactNode;
}

export default function BathroomCard({
  bathroom,
  index,
  variation,
  children,
}: BathroomProps) {
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
  const addressBox = {
    bg: "black",
    display: "inline-block",
    px: 2,
    py: 1,
    color: "white",
    mb: 2,
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
              index! % 2 === 0
                ? "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                : "https://images.unsplash.com/photo-1552454799-ca5cfdc612c8?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            roundedTop={"sm"}
            objectFit="cover"
            h="full"
            w="full"
            alt={"Bathroom Image"}
          />
        </Box>
        <Stack divider={<StackDivider />} spacing="2">
          {children}
        </Stack>
        {variation === "index" ? (
          <HStack borderTop={"1px"} color="black">
            <Flex sx={linkBox}>
              <ChakraLink
                as={ReactRouterLink}
                to={`/bathrooms/${bathroom._id}`}
                fontSize={"md"}
                fontWeight={"semibold"}
              >
                View more
              </ChakraLink>
              <BsArrowUpRight />
            </Flex>
            <Flex sx={linkBox} borderLeft={"1px"}>
              Add review
            </Flex>
          </HStack>
        ) : null}
      </Box>
    </Center>
  );
}
