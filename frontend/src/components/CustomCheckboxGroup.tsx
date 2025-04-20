import {
  useCheckbox,
  Stack,
  Text,
  Flex,
  chakra,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";
import { Controller } from "react-hook-form";

interface CheckboxGroupProps {
  name: string;
  styles?: Record<string, any>;
  control: any;
  label: string;
  options: { value: string; label: string }[];
  errors?: Record<string, any>;
  isRequired?: boolean;
  defaultValue?: string;
  helperText?: string;
}
interface CustomCheckboxProps {
  label?: string;
  isChecked: boolean;
  isDisabled: boolean;
  onChange: () => void;
  value: string;
}

export default function CustomCheckboxGroup({
  name,
  styles,
  control,
  label,
  options,
  errors,
  isRequired = false,
  defaultValue,
  helperText,
}: CheckboxGroupProps) {
  function CustomCheckbox(props: CustomCheckboxProps) {
    const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
      useCheckbox(props);
    const { isDisabled } = props;

    return (
      <chakra.label
        display="flex"
        alignItems="center"
        gridColumnGap={2}
        maxW="40"
        bg={isDisabled ? "gray.100" : "green.50"}
        border="1px solid"
        borderColor={isDisabled ? "gray.100" : "green.500"}
        rounded="lg"
        px={3}
        py={1}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        {...htmlProps}
      >
        <input {...getInputProps()} hidden />
        <Flex
          alignItems="center"
          justifyContent="center"
          border="2px solid"
          borderColor={isDisabled ? "gray.500" : "green.500"}
          w={4}
          h={4}
          {...getCheckboxProps()}
        >
          {state.isChecked && <FiCheck />}
        </Flex>
        <Text {...getLabelProps()}>{props.label}</Text>
      </chakra.label>
    );
  }

  return (
    <FormControl
      sx={styles}
      isRequired={isRequired}
      isInvalid={!!errors?.[name]}
    >
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name as any}
        control={control}
        defaultValue={defaultValue || []}
        render={({ field }) => {
          const { value = [], onChange } = field;

          const handleCheckboxClick = (val: string) => {
            const currentValue = value as string[];
            if (val === "unknown") {
              onChange(currentValue.includes("unknown") ? [] : ["unknown"]);
            } else {
              const filtered = currentValue.filter((v) => v !== "unknown");
              if (currentValue.includes(val)) {
                onChange(filtered.filter((v) => v !== val));
              } else {
                onChange([...filtered, val]);
              }
            }
          };

          return (
            <Stack spacing={2}>
              <Text>
                The selected checkboxes are: {value.sort().join(" and ")}
              </Text>
              {options.map((opt) => (
                <CustomCheckbox
                  key={opt.value}
                  value={opt.value}
                  label={opt.label}
                  isChecked={value.includes(opt.value)}
                  isDisabled={
                    value.includes("unknown") && opt.value !== "unknown"
                  }
                  onChange={() => handleCheckboxClick(opt.value)}
                />
              ))}
            </Stack>
          );
        }}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>{errors?.[name]?.message}</FormErrorMessage>
    </FormControl>
  );
}
