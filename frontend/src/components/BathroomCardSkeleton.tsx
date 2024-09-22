import { Center, Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export default function BathroomCardSkeleton() {
  return (
    <Center py={6}>
      <Box
        padding="6"
        boxShadow="lg"
        bg="white"
        w="xs"
        rounded="sm"
        my="5"
        mx={[0, 5]}
        py="0"
        h="lg"
      >
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={10} spacing="6" skeletonHeight="4" />
      </Box>
    </Center>
  );
}
