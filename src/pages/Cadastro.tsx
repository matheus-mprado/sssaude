import { Flex, Stack, Button, Text } from "@chakra-ui/react";
import { Input } from "../components/form/Input";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from "../service/api";

type SignInFormData = {
    namePrimary: string;
    nameMother: string;
    dateBorn: string;
    cpf: string;
    fone: string;
    worker: string;
    gender: string;
    breed: string;
    address: {
        cep: number;
        street: string;
        number: number;
        district: string;
        city: string;
    }
}

const date = new Date();
const dateConcat = (date.getFullYear() - 18) + "/" + (date.getMonth() + 1) + "/" + date.getDate();

const signInFormSchema = yup.object().shape({
    namePrimary: yup.string()
        .min(5, "Digite seu nome Completo")
        .max(255, "Digite um nome Menor")
        .required('Nome Obrigatório'),

    nameMother: yup.string()
        .required('Nome Obrigatório')
        .min(5, "Digite seu nome completo de sua mãe")
        .max(255, "Digite um nome Menor"),

    dateBorn: yup.date()
        .required('Insira uma data')
        .max(dateConcat, "Digite uma Data Válida")
        .nullable()
        .typeError('Digite uma Data Válida'),

    fone: yup.string()
        .required('Número Obrigatório')
        .min(8, "Digite um número válido")
        .max(255, "Digite um número Menor"),
})


export default function Cadastro() {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(signInFormSchema)
    });

    const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
        await new Promise(resolve => setTimeout(resolve, 2000));

        api.post('/',values)
            .then(response => console.log(response))
            .catch(err => console.log(err))

        console.log(values)
    }

    return (
        <Flex
            w="100vw"
            h="100vh"
            align="center"
            px="4"
            justify="center"
        >

            <Flex
                as="form"
                w="100%"
                maxWidth={360}
                bg="white"
                p="8"
                borderRadius={8}
                flexDir="column"
                onSubmit={handleSubmit(handleSignIn)}
            >
                <Text>
                    Faça seu cadastro
                </Text>
                <Stack spacing="4">
                    <Input
                        name="namePrimary"
                        type="text"
                        label="Nome Completo"
                        error={errors.namePrimary}
                        {...register('namePrimary')}
                    />

                    <Input
                        name="nameMother"
                        type="text"
                        label="Nome da mãe"
                        error={errors.nameMother}
                        {...register('nameMother')}
                    />

                    <Input
                        name="dateBorn"
                        type="date"
                        label="Data de Nascimento"
                        error={errors.dateBorn}
                        defaultValue="1990-01-01"
                        {...register('dateBorn', {
                            valueAsDate: true,
                        })}
                    />

                    <Input
                        name="fone"
                        type="text"
                        label="Telefone"
                        error={errors.fone}
                        {...register('fone')}
                    />
                </Stack>
                <Button
                    type="submit"
                    mt="6"
                    colorScheme="blue"
                    size="lg"
                    isLoading={isSubmitting}
                >
                    Cadastrar
                </Button>
            </Flex>


        </Flex>
    )
}