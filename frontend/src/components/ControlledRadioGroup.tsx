import {
  FormControl,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import { Controller } from "react-hook-form";

type Props = {
  name: string;
  styles?: Record<string, any>;
  control: any;
  label: string;
  options: { value: string; label: string; onChange?: () => void }[];
  errors?: Record<string, any>;
  isRequired?: boolean;
  defaultValue?: string;
  helperText?: string;
};

// Uses React Hook Form Controller as a wrapper to allow for Zod validation
export default function ControlledRadioGroup({
  name,
  styles,
  control,
  label,
  options,
  errors,
  isRequired = false,
  defaultValue,
  helperText,
}: Props) {
  return (
    <FormControl
      sx={styles}
      isRequired={isRequired}
      defaultValue={defaultValue}
      isInvalid={!!errors?.[name]}
    >
      <FormLabel htmlFor={String(name)}>{label}</FormLabel>
      <Controller
        name={name as any}
        control={control}
        render={({ field }) => (
          <RadioGroup {...field} id={String(name)} defaultValue={defaultValue}>
            <Stack spacing={4} direction="row">
              {options.map((opt) => (
                <Radio
                  key={opt.value}
                  value={opt.value}
                  onChange={opt.onChange}
                >
                  {opt.label}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        )}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>{errors?.[name]?.message}</FormErrorMessage>
    </FormControl>
  );
}
