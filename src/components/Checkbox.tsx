import { CheckboxProps, FormErrorMessage } from "@chakra-ui/react";
import { Input as ChakraInput,FormControl, FormLabel,InputProps as ChakraInputProps, Checkbox as ChakraCheckbox   } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import InputMask from "react-input-mask";

interface InputProps extends CheckboxProps{
    name:string;
    label?:string;
    error?: FieldError
    mask?:string;
}

const InputBase:ForwardRefRenderFunction<HTMLInputElement,InputProps> =
    ({name,label, error, ...rest}, ref) => {

    return (
        <FormControl isInvalid={!!error}>
            { !!label && <FormLabel fontSize="small" htmlFor={name}>{label}</FormLabel>}
            <ChakraCheckbox
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
                
            </ChakraCheckbox>

            {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}

        </FormControl>
    )
}

export const Checkbox = forwardRef(InputBase)