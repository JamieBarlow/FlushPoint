import {
  Stack,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  useCheckboxGroup,
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
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { Form, useActionData } from "react-router-dom";

interface ActionData {
  error?: string;
}

export default function NewBathroomForm() {
  const data = useActionData() as ActionData | null;
  const formInputStyles = {
    mb: "20px",
  };
  const { value, getCheckboxProps } = useCheckboxGroup();
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
            <FormControl sx={formInputStyles} isRequired>
              <FormLabel>Gender Access</FormLabel>
              <Select
                placeholder="Select option"
                variant="outline"
                name="gender"
              >
                <option value="Gender segregated">
                  Gender segregated (M & F separate)
                </option>
                <option value="Unisex (gender neutral)">
                  Unisex (gender neutral)
                </option>
                <option value="Male only">Male only</option>
                <option value="Female only">Female only</option>
                <option value="Don't know">Don't know</option>
              </Select>
            </FormControl>
            <FormControl
              sx={formInputStyles}
              isRequired
              defaultValue={"unknown"}
            >
              <FormLabel>Wheelchair building access</FormLabel>
              <RadioGroup
                defaultValue="unknown"
                name="wheelchairBuildingAccess"
              >
                <Stack spacing={4} direction="row">
                  <Radio value="yes">Unrestricted (stepless entry)</Radio>
                  <Radio value="limited">Limited (partially accessible)</Radio>
                  <Radio value="no">Restricted (stairs only)</Radio>
                  <Radio value="designated">Designated (e.g. elevator)</Radio>
                  <Radio value="unknown">Unknown</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl
              sx={formInputStyles}
              isRequired
              defaultValue={"unknown"}
            >
              <FormLabel>Wheelchair toilet access</FormLabel>
              <RadioGroup defaultValue="unknown" name="wheelchairToiletAccess">
                <Stack spacing={4} direction="row">
                  <Radio value="yes">Unrestricted (stepless entry)</Radio>
                  <Radio value="limited">Limited (partially accessible)</Radio>
                  <Radio value="no">Restricted (stairs only)</Radio>
                  <Radio value="designated">Designated (e.g. elevator)</Radio>
                  <Radio value="unknown">Unknown</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl mb="40px" sx={formInputStyles}>
              <FormLabel>Any other wheelchair info?</FormLabel>
              <Textarea
                placeholder="Enter more info"
                name="wheelchairDescription"
              />
            </FormControl>
            <FormControl sx={formInputStyles} isRequired defaultValue={"no"}>
              <FormLabel>Fee for entry?</FormLabel>
              <RadioGroup defaultValue="unknown" name="fee">
                <Stack spacing={4} direction="row">
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No (free)</Radio>
                  <Radio value="unknown">Unknown</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl sx={formInputStyles} isRequired defaultValue={"no"}>
              <FormLabel>Seats / urinals for children?</FormLabel>
              <RadioGroup defaultValue="unknown" name="child">
                <Stack spacing={4} direction="row">
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                  <Radio value="unknown">Unknown</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl
              sx={formInputStyles}
              isRequired
              defaultValue={"unknown"}
            >
              <FormLabel>Changing table</FormLabel>
              <RadioGroup defaultValue="unknown" name="changing_table">
                <Stack spacing={4} direction="row">
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                  <Radio value="limited">Limited</Radio>
                  <Radio value="unknown">Unknown</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl sx={formInputStyles} defaultValue={"unknown"}>
              <FormLabel>
                Changing table location (can select multiple)
              </FormLabel>
              <CheckboxGroup defaultValue={["unknown"]}>
                <Stack spacing={4} direction="row">
                  <Checkbox
                    name="changing_table:location"
                    {...getCheckboxProps({ value: "wheelchair_toilet" })}
                  >
                    Wheelchair toilet
                  </Checkbox>
                  <Checkbox
                    name="changing_table:location"
                    {...getCheckboxProps({ value: "female_toilet" })}
                  >
                    Female toilet
                  </Checkbox>
                  <Checkbox
                    name="changing_table:location"
                    {...getCheckboxProps({ value: "male_toilet" })}
                  >
                    Male toilet
                  </Checkbox>
                  <Checkbox
                    name="changing_table:location"
                    {...getCheckboxProps({ value: "unisex_toilet" })}
                  >
                    Unisex toilet
                  </Checkbox>
                  <Checkbox
                    name="changing_table:location"
                    {...getCheckboxProps({ value: "dedicated_room" })}
                  >
                    Dedicated room
                  </Checkbox>
                  <Checkbox
                    name="changing_table:location"
                    isDisabled={value[0] === "unknown"}
                    {...getCheckboxProps({ value: "room" })}
                  >
                    Other room
                  </Checkbox>
                  <Checkbox
                    name="changing_table:location"
                    {...getCheckboxProps({ value: "unknown" })}
                  >
                    Unknown
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
            <h3>The selected checkboxes are: {value.sort().join(" and ")}</h3>
            <Button type="submit">Submit</Button>
          </Form>
          {data?.error && <p>{data.error}</p>}
        </Box>
      </Box>
    </>
  );
}
