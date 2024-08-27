import { Box, Heading } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <Box className="pageWrapper">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
