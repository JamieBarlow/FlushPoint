import { useCheckbox, FormLabel, Flex, Icon, Text } from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";

interface ICustomCheckboxProps {
  label?: string;
  isChecked: boolean;
  isDisabled: boolean;
  onChange: () => void;
}

export const CustomCheckbox = ({
  label,
  onChange,
  isChecked,
  isDisabled,
}: ICustomCheckboxProps) => {
  // Load checkbox hook
  const { state, getCheckboxProps, getInputProps, htmlProps } = useCheckbox({
    isChecked: isChecked,
    isIndeterminate: false,
    isDisabled: isDisabled,
    onChange: onChange,
  });

  // Return checkbox
  return (
    <FormLabel
      display="flex"
      flexDirection="row"
      alignItems="center"
      gridColumnGap={2}
      maxW="36"
      rounded="lg"
      cursor="pointer"
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      <Flex
        alignItems="center"
        justifyContent="center"
        border="2px solid"
        borderColor="gray.300"
        w={4}
        h={4}
        {...getCheckboxProps()}
      >
        {state.isChecked && (
          <Icon as={FiCheck} color="white" w={4} h={4} bg="blue.500" />
        )}
        {label && <Text>{label}</Text>}
      </Flex>
    </FormLabel>
  );
};
