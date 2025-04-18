import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";

type Props = {
  name: string;
  control: any;
  label: string;
  styles?: Record<string, any>;
  min?: number;
  max?: number;
  errors?: Record<string, any>;
  isRequired?: boolean;
  defaultValue?: number;
  helperText?: string;
};

export default function ControlledNumberInput({
  name,
  control,
  label,
  styles,
  errors,
  isRequired,
  defaultValue,
  helperText,
  min,
  max,
}: Props) {
  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={!!errors?.[name]}
      sx={styles}
    >
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <NumberInput
            {...field}
            defaultValue={defaultValue}
            min={min}
            max={max}
            value={field.value}
            onChange={(valueString, valueNumber) => {
              field.onChange(isNaN(valueNumber) ? undefined : valueNumber); // Parse string to number
            }}
            id={name}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        )}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>{errors?.[name]?.message}</FormErrorMessage>
    </FormControl>
  );
}
