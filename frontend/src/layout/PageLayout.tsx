import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <Box className="pageWrapper">{children}</Box>
      <Footer />
    </>
  );
}
