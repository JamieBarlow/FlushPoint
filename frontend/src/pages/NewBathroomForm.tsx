import {
  Stack,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Select,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { FaRegThumbsUp } from "react-icons/fa";
import { Form, useActionData } from "react-router-dom";

interface ActionData {
  error?: string;
}

export default function NewBathroomForm() {
  const data = useActionData() as ActionData | null;
  const formInputStyles = {
    mb: "20px",
  };
  return (
    <>
      <Box className="pageWrapper" py="40px">
        <Heading>New Bathroom</Heading>
        <Box maxW="480px">
          <Form method="post">
            <FormControl isRequired sx={formInputStyles}>
              <FormLabel>Bathroom name:</FormLabel>
              <Input type="text" name="name" />
              <FormHelperText>
                Enter the location name (e.g. 'London Road Public Toilets')
              </FormHelperText>
            </FormControl>
            <FormControl isRequired sx={formInputStyles}>
              <FormLabel>Address</FormLabel>
              <Input type="text" name="address" />
              <FormHelperText>
                (include street and full postcode if known)
              </FormHelperText>
            </FormControl>
            <FormControl mb="40px" sx={formInputStyles}>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder="Enter a description" name="description" />
            </FormControl>
            <FormControl sx={formInputStyles}>
              <FormLabel>Operator</FormLabel>
              <Input type="text" name="operator" />
              <FormHelperText>(e.g. Westminster City Council)</FormHelperText>
            </FormControl>
            <FormControl sx={formInputStyles}>
              <FormLabel>Opening Hours</FormLabel>
              <Input type="text" name="openingHours" />
              <FormHelperText>
                (e.g. Mo 10:00-16:00; Tu 10:00-20:00; We 11:00-18:00; Th
                11:30-15:30; Fr 09:00-12:00; PH off)
              </FormHelperText>
            </FormControl>
            <FormControl sx={formInputStyles}>
              <FormLabel>Gender Access</FormLabel>
              <Select
                placeholder="Select option"
                variant="outline"
                name="gender"
              >
                <option value="Gender segregated">Gender segregated</option>
                <option value="Unisex (gender neutral)">
                  Unisex (gender neutral)
                </option>
                <option value="Male only">Male only</option>
                <option value="Female only">Female only</option>
                <option value="Don't know">Don't know</option>
              </Select>
            </FormControl>
            <FormControl sx={formInputStyles}>
              <FormLabel>Wheelchair accessibility</FormLabel>
              <Checkbox
                value="Building Access"
                size="lg"
                icon={<FaRegThumbsUp />}
              >
                Building Access?
              </Checkbox>
            </FormControl>
            <FormControl sx={formInputStyles}>
              <FormLabel>Wheelchair toilet access</FormLabel>
              <RadioGroup>
                <Stack direction="row">
                  <Radio value="1">
                    No unrestricted building access (stairs only)
                  </Radio>
                  <Radio value="2">Partial/limited access</Radio>
                  <Radio value="3">Designated (e.g. elevator)</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl
              display="flex"
              alignItems="center"
              sx={formInputStyles}
            >
              <Checkbox name="isFree" size="lg" colorScheme="teal" />
              <FormLabel ml="10px" mb="0">
                Is free?
              </FormLabel>
            </FormControl>
            <Button type="submit">Submit</Button>
          </Form>
          {data?.error && <p>{data.error}</p>}
        </Box>
      </Box>
    </>
  );
}
