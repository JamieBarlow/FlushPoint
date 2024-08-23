import { Box } from "@chakra-ui/react";

export default function NavToggle({ toggle, isOpen }) {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
}
