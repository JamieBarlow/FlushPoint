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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bathroomSchema, FormFields } from "../schemas/bathroomSchema";
import ControlledRadioGroup from "../components/ControlledRadioGroup";
import ControlledNumberInput from "../components/ControlledNumberInput";

interface ActionData {
  error?: string;
}

export default function NewBathroomForm() {
  const data = useActionData() as ActionData | null;
  const formInputStyles = {
    mb: "20px",
  };
  const [productsAvailable, setProductsAvailable] = useState(false);
  const [changingTableAvailable, setChangingTableAvailable] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(bathroomSchema),
  });

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
              <Input id="name" type="text" {...register("name")} />
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
                {...register("addr:street")}
              />
              <FormErrorMessage>
                {String(errors["addr:street"]?.message)}
              </FormErrorMessage>
              <FormHelperText>
                (include street and full postcode if known)
              </FormHelperText>
            </FormControl>
            <FormControl
              mb="40px"
              sx={formInputStyles}
              isInvalid={!!errors.description}
            >
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                id="description"
                placeholder="Enter a description"
                {...register("description")}
              />
              <FormErrorMessage>
                {String(errors.description?.message)}
              </FormErrorMessage>
            </FormControl>
            <FormControl sx={formInputStyles} isInvalid={!!errors.operator}>
              <FormLabel htmlFor="operator">Operator</FormLabel>
              <Input type="text" id="operator" {...register("operator")} />
              <FormHelperText>(e.g. Westminster City Council)</FormHelperText>
              <FormErrorMessage>
                {String(errors.operator?.message)}
              </FormErrorMessage>
            </FormControl>
            <FormControl sx={formInputStyles}>
              <FormLabel>Opening Hours</FormLabel>
              <Input type="text" name="opening_hours" />
              <FormHelperText>
                (e.g. Mo 10:00-16:00; Tu 10:00-20:00; We 11:00-18:00; Th
                11:30-15:30; Fr 09:00-12:00; PH off)
              </FormHelperText>
            </FormControl>
            <ControlledRadioGroup
              name="access"
              styles={formInputStyles}
              control={control}
              label="Accessible to public?"
              isRequired
              options={[
                { value: "yes", label: "Yes" },
                { value: "customers", label: "Customers only" },
                { value: "unknown", label: "Unknown" },
              ]}
              errors={errors}
            />
            <ControlledRadioGroup
              name="fee"
              styles={formInputStyles}
              control={control}
              label="Fee for entry?"
              isRequired
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No (free)" },
                { value: "donation", label: "Donation (voluntary)" },
                { value: "unknown", label: "Unknown" },
              ]}
              errors={errors}
            />
            <ControlledRadioGroup
              name="locked"
              styles={formInputStyles}
              control={control}
              label="Locked / requires key?"
              isRequired
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "unknown", label: "Unknown" },
              ]}
              helperText="Doesn't refer to locking outside operating hours"
              errors={errors}
            />
            <ControlledRadioGroup
              name="indoor"
              styles={formInputStyles}
              control={control}
              label="Entrance location"
              isRequired
              options={[
                { value: "yes", label: "Indoors" },
                { value: "no", label: "Outdoors" },
                { value: "unknown", label: "Unknown" },
              ]}
              errors={errors}
            />
            <ControlledNumberInput
              name="level"
              control={control}
              styles={formInputStyles}
              label="Floor"
              errors={errors}
              defaultValue={0}
              min={-10}
              max={10}
              helperText="(0 = ground floor)"
            />
            <FormControl
              sx={formInputStyles}
              isRequired
              isInvalid={!!errors.gender_segregated}
            >
              <FormLabel htmlFor="gender_segregated">Gender Access</FormLabel>
              <Select
                id="gender_segregated"
                placeholder="Select option"
                variant="outline"
                {...register("gender_segregated")}
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
              <FormErrorMessage>
                {String(errors.gender_segregated?.message)}
              </FormErrorMessage>
            </FormControl>
            <ControlledRadioGroup
              name="wheelchair"
              styles={formInputStyles}
              control={control}
              label={"Wheelchair building access"}
              isRequired
              options={[
                {
                  value: "yes",
                  label: "Unrestricted (stepless entry)",
                },
                { value: "limited", label: "Limited (partially accessible)" },
                { value: "no", label: "Restricted (stairs only)" },
                { value: "designated", label: "Designated (e.g. elevator)" },
                { value: "unknown", label: "Unknown" },
              ]}
              errors={errors}
            />
            <ControlledRadioGroup
              name="toilets:wheelchair"
              styles={formInputStyles}
              control={control}
              label={"Wheelchair toilet access"}
              isRequired
              options={[
                {
                  value: "yes",
                  label: "Unrestricted (stepless entry)",
                },
                { value: "limited", label: "Limited (partially accessible)" },
                { value: "no", label: "Restricted (stairs only)" },
                { value: "designated", label: "Designated (e.g. elevator)" },
                { value: "unknown", label: "Unknown" },
              ]}
              errors={errors}
            />
            <FormControl
              mb="40px"
              sx={formInputStyles}
              isInvalid={!!errors["wheelchair:description"]}
            >
              <FormLabel htmlFor="wheelchair:description">
                Any other wheelchair info?
              </FormLabel>
              <Textarea
                id="wheelchair:description"
                placeholder="Enter more info"
                {...register("wheelchair:description")}
              />
              <FormErrorMessage>
                {String(errors["wheelchair:description"]?.message)}
              </FormErrorMessage>
            </FormControl>
            <FormControl sx={formInputStyles} defaultValue={"unknown"}>
              <CustomCheckboxGroup
                name="toilets:position"
                control={control}
                label="Toilet position(s) available (tick all that apply):"
                isRequired
                options={[
                  { value: "seated", label: "Seated" },
                  { value: "urinal", label: "Urinal" },
                  { value: "squat", label: "Squat" },
                  { value: "unknown", label: "Unknown" },
                ]}
                errors={errors}
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
                {/* <CustomCheckboxGroup
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
                /> */}
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
