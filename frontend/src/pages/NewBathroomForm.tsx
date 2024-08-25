import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NewBathroomForm() {
  const [formData, setFormData] = useState({});
  const {} = formData;
  let onChange;
  return (
    <>
      <Navbar />
      <Box className="pageWrapper" py="40px">
        <Heading>New Bathroom</Heading>
        <Box maxW="480px">
          {/* Update to React Router <Form> */}
          <form>
            <FormControl isRequired mb="40px">
              <FormLabel>Bathroom name:</FormLabel>
              <Input type="text" name="name" />
              <FormHelperText>
                Enter the location name (e.g. 'London Road Public Toilets')
              </FormHelperText>
            </FormControl>
            <FormControl mb="40px">
              <FormLabel>Description</FormLabel>
              <Textarea placeholder="Enter a description" name="description" />
            </FormControl>
            <FormControl display="flex" alignItems="center" mb="40px">
              <Checkbox name="isFree" size="lg" colorScheme="teal" />
              <FormLabel ml="10px" mb="0">
                Is free?
              </FormLabel>
            </FormControl>
            <Button type="submit">Submit</Button>
          </form>
        </Box>
        {/* <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Bathroom name"
            />
          </div>
        </form> */}
      </Box>
      <Footer />
    </>
  );
}
