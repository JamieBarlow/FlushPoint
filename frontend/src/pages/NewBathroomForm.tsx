import {
  Stack,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Select,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import { Form, useActionData, useFetcher } from "react-router-dom";
import CustomCheckboxGroup from "../components/CustomCheckboxGroup";
import { useForm } from "react-hook-form";

interface ActionData {
  error?: string;
}

const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm();

const fetcher = useFetcher();
const onValid = (data: any) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "string" || value instanceof Blob) {
      formData.append(key, value);
    } else if (value != null) {
      formData.append(key, String(value));
    }
  });
  console.log(formData);
  fetcher.submit(formData, { method: "post" });
};

export default function NewBathroomForm() {
  const data = useActionData() as ActionData | null;
  const formInputStyles = {
    mb: "20px",
  };
  const [productsAvailable, setProductsAvailable] = useState(false);
  const [changingTableAvailable, setChangingTableAvailable] = useState(false);

  return (
    <>
      <Box className="pageWrapper" py="40px">
        <Heading>New Bathroom</Heading>
        <Box maxW="480px">
          <form onSubmit={handleSubmit(onValid)}>
            <FormControl
              isRequired
              sx={formInputStyles}
              isInvalid={!!errors.name}
            >
              <FormLabel htmlFor="name">Bathroom name:</FormLabel>
              <Input
                id="name"
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4 characters",
                  },
                })}
              />
              <FormErrorMessage>
                {String(errors.name?.message)}
              </FormErrorMessage>
              <FormHelperText>
                Enter the location name (e.g. 'London Road Public Toilets')
              </FormHelperText>
            </FormControl>
            <FormControl
              isRequired
              sx={formInputStyles}
              isInvalid={!!errors["addr:street"]}
            >
              <FormLabel htmlFor="addr:street">Address</FormLabel>
              <Input
                id="addr:street"
                type="text"
                {...register("addr:street", {
                  required: "Address is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4 characters",
                  },
                })}
              />
              <FormErrorMessage>
                {String(errors["addr:street"]?.message)}
              </FormErrorMessage>
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
              <Input type="text" name="opening_hours" />
              <FormHelperText>
                (e.g. Mo 10:00-16:00; Tu 10:00-20:00; We 11:00-18:00; Th
                11:30-15:30; Fr 09:00-12:00; PH off)
              </FormHelperText>
            </FormControl>
            <FormControl sx={formInputStyles} isRequired>
              <FormLabel>Accessible to public?</FormLabel>
              <RadioGroup name="access">
                <Stack spacing={4} direction="row">
                  <Radio value="yes">Yes</Radio>
                  <Radio value="customers">Customers only</Radio>
                  <Radio value="unknown">Unknown</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl sx={formInputStyles} isRequired defaultValue={"no"}>
              <FormLabel>Fee for entry?</FormLabel>
              <RadioGroup defaultValue="unknown" name="fee">
                <Stack spacing={4} direction="row">
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No (free)</Radio>
                  <Radio value="donation">Donation (voluntary)</Radio>
                  <Radio value="unknown">Unknown</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl sx={formInputStyles} isRequired defaultValue={"no"}>
              <FormLabel>Locked / requires key?</FormLabel>
              <RadioGroup defaultValue="unknown" name="locked">
                <Stack spacing={4} direction="row">
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                  <Radio value="unknown">Unknown</Radio>
                </Stack>
              </RadioGroup>
              <FormHelperText>
                Doesn't refer to locking outside operating hours
              </FormHelperText>
            </FormControl>
            <FormControl sx={formInputStyles} isRequired defaultValue={"no"}>
              <FormLabel>Entrance location</FormLabel>
              <RadioGroup defaultValue="unknown" name="indoor">
                <Stack spacing={4} direction="row">
                  <Radio value="yes">Indoors</Radio>
                  <Radio value="no">Outdoors</Radio>
                  <Radio value="unknown">Unknown</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Floor (0 = ground floor)</FormLabel>
              <NumberInput defaultValue={0} min={-10} max={10} name="level">
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl sx={formInputStyles} isRequired>
              <FormLabel>Gender Access</FormLabel>
              <Select
                placeholder="Select option"
                variant="outline"
                name="gender_segregated"
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
              <RadioGroup defaultValue="unknown" name="wheelchair">
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
              <RadioGroup defaultValue="unknown" name="toilets:wheelchair">
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
                name="wheelchair:description"
              />
            </FormControl>
            <FormControl sx={formInputStyles} defaultValue={"unknown"}>
              <FormLabel>
                Toilet position(s) available (tick all that apply):
              </FormLabel>
              <CustomCheckboxGroup
                name="toilets:position"
                options={[
                  { value: "seated", label: "Seated" },
                  { value: "urinal", label: "Urinal" },
                  { value: "squat", label: "Squat" },
                  { value: "unknown", label: "Unknown" },
                ]}
              />
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
                  <Radio
                    value="yes"
                    onChange={() => {
                      !changingTableAvailable &&
                        setChangingTableAvailable(true);
                    }}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="no"
                    onChange={() => {
                      changingTableAvailable &&
                        setChangingTableAvailable(false);
                    }}
                  >
                    No
                  </Radio>
                  <Radio
                    value="limited"
                    onChange={() => {
                      changingTableAvailable &&
                        setChangingTableAvailable(false);
                    }}
                  >
                    Limited
                  </Radio>
                  <Radio
                    value="unknown"
                    onChange={() => {
                      changingTableAvailable &&
                        setChangingTableAvailable(false);
                    }}
                  >
                    Unknown
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            {changingTableAvailable && (
              <FormControl sx={formInputStyles} defaultValue={"unknown"}>
                <FormLabel>
                  Changing table location (can select multiple)
                </FormLabel>
                <CustomCheckboxGroup
                  name="changing_table:location"
                  options={[
                    { value: "wheelchair_toilet", label: "Wheelchair toilet" },
                    { value: "female_toilet", label: "Female toilet" },
                    { value: "male_toilet", label: "Male toilet" },
                    { value: "unisex_toilet", label: "Unisex toilet" },
                    { value: "dedicated_room", label: "Dedicated room" },
                    { value: "room", label: "Other room" },
                    { value: "unknown", label: "Unknown" },
                  ]}
                />
              </FormControl>
            )}
            <FormControl sx={formInputStyles} isRequired defaultValue={"no"}>
              <FormLabel>Drinking water available?</FormLabel>
              <RadioGroup defaultValue="unknown" name="drinking_water">
                <Stack spacing={4} direction="row">
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                  <Radio value="unknown">Unknown</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl sx={formInputStyles} isRequired defaultValue={"no"}>
              <FormLabel>Menstrual products available?</FormLabel>
              <RadioGroup
                defaultValue="unknown"
                name="toilets:menstrual_products"
              >
                <Stack spacing={4} direction="row">
                  <Radio
                    value="yes"
                    onChange={() => {
                      !productsAvailable && setProductsAvailable(true);
                    }}
                  >
                    Yes
                  </Radio>
                  <Radio
                    value="no"
                    onChange={() => {
                      productsAvailable && setProductsAvailable(false);
                    }}
                  >
                    No
                  </Radio>
                  <Radio
                    value="unknown"
                    onChange={() => {
                      productsAvailable && setProductsAvailable(false);
                    }}
                  >
                    Unknown
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            {productsAvailable && (
              <FormControl sx={formInputStyles} isRequired defaultValue={"no"}>
                <FormLabel>Available where?</FormLabel>
                <RadioGroup defaultValue="unknown" name="vending">
                  <Stack spacing={4} direction="row">
                    <Radio value="free">Free (Accessible to all)</Radio>
                    <Radio value="limited">Free (Female only stalls)</Radio>
                    <Radio value="vending">Vending machine</Radio>
                    <Radio value="unknown">Unknown</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            )}
            <FormControl sx={formInputStyles} isRequired defaultValue={"no"}>
              <FormLabel>Supervised?</FormLabel>
              <RadioGroup defaultValue="unknown" name="supervised">
                <Stack spacing={4} direction="row">
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                  <Radio value="interval">Intervals</Radio>
                  <Radio value="unknown">Unknown</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl sx={formInputStyles} isRequired defaultValue={"no"}>
              <FormLabel>Shower?</FormLabel>
              <RadioGroup defaultValue="unknown" name="shower">
                <Stack spacing={4} direction="row">
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                  <Radio value="unknown">Unknown</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl mb="40px" sx={formInputStyles}>
              <FormLabel>Any other comments?</FormLabel>
              <Textarea placeholder="Enter more info" name="fixme" />
              <FormHelperText>
                Use only to flag anything to other taggers that may need
                changing / checking
              </FormHelperText>
            </FormControl>
            <Button type="submit" isLoading={isSubmitting}>
              Submit
            </Button>
          </form>
          {data?.error && <p>{data.error}</p>}
        </Box>
      </Box>
    </>
  );
}
