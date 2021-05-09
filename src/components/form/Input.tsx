import { FormErrorMessage } from "@chakra-ui/react";
import { Input as ChakraInput,FormControl, FormLabel,InputProps as ChakraInputProps  } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import InputMask, { ReactInputMask } from 'react-input-mask'

interface InputProps extends ChakraInputProps{
    name:string;
    label?:string;
    error?: FieldError
    mask?:string;
}

const InputBase:ForwardRefRenderFunction<HTMLInputElement,InputProps> =
    ({name,label, error, mask,...rest}, ref) => {

    return (
        <FormControl isInvalid={!!error}>
            { !!label && <FormLabel fontSize="small" htmlFor={name}>{label}</FormLabel>}
            <ChakraInput
                as={InputMask}
                mask={mask}
                id={name}
                name={name}
                focusBorderColor="blue.500"
                bgColor="gray.50"
                variant="filled"
                maskChar='_'
                _hover={{
                    bgColor: 'gray.50'
                }}
                size="lg"
                inputRef={ref}
                {...rest}
            />

            {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}

        </FormControl>
    )
}

export const Input = forwardRef(InputBase)