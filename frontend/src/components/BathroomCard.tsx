import {
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  Heading,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { BsArrowUpRight } from "react-icons/bs";

export default function BathroomCard({ bathroom, index }) {
  return (
    <Center py={6}>
      <Box
        w="xs"
        rounded={"sm"}
        my={5}
        mx={[0, 5]}
        overflow={"hidden"}
        bg="white"
        border={"1px"}
        borderColor="black"
        boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
      >
        <Box h={"200px"} borderBottom={"1px"} borderColor="black">
          <Img
            src={
              index % 2 === 0
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
          <Box p={4}>
            <Box
              bg="black"
              display={"inline-block"}
              px={2}
              py={1}
              color="white"
              mb={2}
            >
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
        </Stack>
        <HStack borderTop={"1px"} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
          >
            <Text fontSize={"md"} fontWeight={"semibold"}>
              View more
            </Text>
            <BsArrowUpRight />
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            borderLeft={"1px"}
            cursor="pointer"
          >
            HI
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
}
