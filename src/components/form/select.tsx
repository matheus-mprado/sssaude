import { FormErrorMessage, Select as ChakraSelect, SelectProps as ChakraSelectProps } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction, ReactElement, ReactNode } from "react";
import { FieldError } from "react-hook-form";


interface SelectProps extends ChakraSelectProps{
    name:string;
    label?:string;
    error?: FieldError
    children:ReactElement;
}

const InputBase:ForwardRefRenderFunction<HTMLSelectElement,SelectProps> =
    ({name,label, error, ...rest}, ref) => {

    return (
        <FormControl isInvalid={!!error}>
            { !!label && <FormLabel fontSize="small" htmlFor={name}>{label}</FormLabel>}
            <ChakraSelect
                id={name}
                name={name}
                focusBorderColor="blue.500"
                bgColor="gray.50"
                variant="filled"
                _hover={{
                    bgColor: 'gray.50'
                }}
                size="lg"
                ref={ref}
                {...rest}
            >
            </ChakraSelect>

            {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}

        </FormControl>
    )
}

export const Select = forwardRef(InputBase)