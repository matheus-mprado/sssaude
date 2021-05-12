import Head from "next/head";
import { useState } from "react";
import * as yup from 'yup'
import { Button, Flex, Icon, IconButton, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import { BiLeftArrowAlt } from 'react-icons/bi'

import { Input } from "../components/form/Input";
import { ResultIMC } from "../components/IMC/ResultIMC";
import Link from "next/link";

const signInFormSchema = yup.object().shape({

    peso: yup.number()
        .required('Peso Obrigatório')
        .nullable()
        .typeError('Digite um peso válido'),

    altura: yup.number()
        .required('Altura Obrigatória')
        .nullable()
        .typeError('Digite uma altura válida'),

})

type SignInFormData = {
    peso: number;
    altura: number;
}

export default function CalculadoraIMC() {

    const [isResultActive, setIsResultActive] = useState(false)
    const [valueIMC, setValuesIMC] = useState({} as SignInFormData);

    const { getValues, setValue, register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm({
        resolver: yupResolver(signInFormSchema)
    });

    const handleSignIn: SubmitHandler<SignInFormData> = (values, event) => {
        event.preventDefault();

        setValuesIMC(values)

        setIsResultActive(true);

    }


    return (
        <>
            <Head>
                <title>Em análise | Prefeitura de São Sebastião</title>
                <link rel="shortcut icon" href="/favicon.png" type="image/png" />
            </Head>
            <Flex
                flexDir="column"
                justify="center"
                w="100%"
                position="relative"
            >
                <Text
                    px="6"
                    fontWeight="600"
                    fontSize="smaller"
                    textAlign="center"
                    py="4"
                >
                    CALCULADORA DE IMC
                </Text>

                <Link href="/" passHref>
                    <IconButton
                        as="a"
                        variant="unstyled"
                        aria-label="Back page"
                        position="absolute"
                        top="12.5px"
                        left="15px"
                        h="0"
                        m="0"
                        icon={<BiLeftArrowAlt size="25" />}
                    />
                </Link>

                <Flex
                    w="100%"
                    flexDir="column"
                    align="flex-start"
                    h="calc(100vh - 51px)"
                    py="8"
                    px="6"
                    bg="white"
                    borderRadius="2rem 2rem 0 0"
                >
                    <Text
                        fontSize="3xl"
                        fontWeight="700"
                        color="#0c4ffd"
                        lineHeight="2.25rem"
                    >
                        Faça o calculo do seu IMC
                    </Text>

                    <Flex
                        as="form"
                        flexDir="column"
                        mt="6"
                        w="100%"
                        onSubmit={handleSubmit(handleSignIn)}
                    >
                        <VStack spacing="8">
                            <Input
                                name="peso"
                                type="number"
                                label="Peso (kg)"
                                error={errors.peso}
                                {...register('peso')}
                            />

                            <Input
                                name="altura"
                                type="number"
                                label="Altura (centimetros)"
                                error={errors.altura}
                                {...register('altura')}
                            />

                            <Button
                                type="submit"
                                w="100%"
                                bg="#f7b52d"
                                color="gray.50"
                                size="lg"
                                disabled={!isDirty}
                                isLoading={isSubmitting}
                                _hover={{
                                    filter:'brightness(0.9)',
                                }}
                            >
                                CALCULAR IMC
                            </Button>
                        </VStack>
                    </Flex>

                    {isResultActive &&
                        <ResultIMC values={valueIMC} />
                    }



                </Flex>


            </Flex>
        </>
    )
}