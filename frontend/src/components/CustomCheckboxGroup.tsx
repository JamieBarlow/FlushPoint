import {
  useCheckbox,
  Stack,
  Text,
  Flex,
  useCheckboxGroup,
  chakra,
} from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";
import { useState } from "react";

interface ICustomCheckboxProps {
  label?: string;
  isChecked: boolean;
  isDisabled: boolean;
  onChange: () => void;
}

type Option = {
  value: string;
  label: string;
};
interface CheckboxGroupProps {
  options: Option[];
}

export default function customCheckboxGroup({ options }: CheckboxGroupProps) {
  function CustomCheckbox(props: ICustomCheckboxProps) {
    const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
      useCheckbox(props);
    const { isDisabled } = props;
    return (
      <chakra.label
        display="flex"
        flexDirection="row"
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
          {state.isChecked && (
            <FiCheck />
            // <Box w={2} h={2} bg={isDisabled ? "gray.500" : "green.500"} />
          )}
        </Flex>
        <Text {...getLabelProps()}>{props.label}</Text>
      </chakra.label>
    );
  }

  const { value, setValue, getCheckboxProps } = useCheckboxGroup();
  const [isUnknown, setIsUnknown] = useState(false);
  const handleClick = (selection: string) => {
    if (selection === "unknown" && !isUnknown) {
      setValue(["unknown"]);
      setIsUnknown(true);
    } else if (selection === "unknown" && isUnknown) {
      setValue([]);
      setIsUnknown(false);
    } else {
      if (value.includes(selection)) {
        setValue(value.filter((v) => v !== selection));
      } else {
        setValue([...value, selection]);
      }
    }
  };

  return (
    <Stack spacing={2}>
      <Text>The selected checkboxes are: {value.sort().join(" and ")}</Text>
      {options.map((option) => {
        const isChecked = value.includes(option.value); // Check if the current option is selected

        return (
          <CustomCheckbox
            key={option.value} // Unique key
            {...getCheckboxProps({ value: option.value })}
            label={option.label}
            isDisabled={value.includes("unknown") && option.value !== "unknown"} // Disable if "unknown" is selected
            isChecked={isChecked}
            onChange={() => handleClick(option.value)}
          />
        );
      })}
    </Stack>
  );
}
