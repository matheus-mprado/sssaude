import { Flex, Stack, Button, Text } from "@chakra-ui/react";
import { Input } from "../components/form/Input";
import { Select } from "../components/form/select";

import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from "../service/api";
import { useState } from "react";
import axios from "axios";

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

    profissao: yup.string()
        .min(8, "Digite um número válido")
        .max(255, "Digite um número Menor"),

    genero: yup.string()
        .required("Selecione uma opção"),

    cep: yup.number()
        .required("Digite um CEP Válido")
        .nullable()
        .typeError('Digite uma CEP Válido'),

    logradouro: yup.string()
        .required("Digite uma rua Válida"),

    bairro: yup.string()
        .required("Digite um Bairro Válido")
        .min(3, "Digite um Bairro Válido"),

    numero: yup.number()
        .required("Digite um número Válido")
        .nullable()
        .typeError('Digite um número Válido'),
})


export default function Cadastro() {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(signInFormSchema)
    });

    const [selectGenero, setSelectGenero] = useState('')
    const [selectRaca, setSelectRaca] = useState('')

    const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
        await new Promise(resolve => setTimeout(resolve, 2000));

        api.post('/', values)
            .then(response => console.log(response))
            .catch(err => console.log(err))

        console.log(values)
    }

    function handleSetCEP(cep:number){
        
        axios.get(`http://correiosapi.apphb.com/cep/${cep}`)
            .then(response => setTimeout(()=>console.log(response.data),2000))
    }

    return (
        <Flex
            w="100vw"
            h="100vh"
            align="flex-start"
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
                <Text fontSize="medium" mb="4" fontWeight="600">
                    1 - Faça seu cadastro
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

                    <Input
                        name="profissao"
                        type="text"
                        label="Profissão"
                        error={errors.profissao}
                        {...register('work')}

                    />

                    <Select
                        name="genero"
                        label="Genêro"
                        error={errors.genero}
                        {...register('genero')}
                        value={selectGenero}
                        onChange={(e) => setSelectGenero(e.target.value)}
                    >
                        <>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Não Informado">Não informado</option>
                        </>
                    </Select>

                    <Select
                        name="raca"
                        label="Raça"
                        error={errors.raca}
                        {...register('raca')}
                        value={selectRaca}
                        onChange={(e) => setSelectRaca(e.target.value)}
                    >
                        <>
                            <option value="Branco">Branco</option>
                            <option value="Pardo">Pardo</option>
                            <option value="Preto">Preto</option>
                            <option value="Amarelo">Amarelo</option>
                        </>
                    </Select>
                </Stack>


                <Text fontSize="medium" mb="4" mt="8" fontWeight="600">
                    2 - Endereço
                </Text>

                <Stack spacing="4">
                    <Input
                        name="cep"
                        type="text"
                        label="CEP"
                        error={errors.cep}
                        {...register('cep')}
                        // onChange={(e)=>handleSetCEP(Number(e.target.value))}
                    />

                    <Input
                        name="logradouro"
                        type="text"
                        label="Logradouro"
                        error={errors.logradouro}
                        {...register('logradouro')}
                    />

                    <Input
                        name="numero"
                        type="text"
                        label="Nº (Número da Residência)"
                        error={errors.numero}
                        {...register('numero')}
                    />

                    <Input
                        name="bairro"
                        type="text"
                        label="Bairro"
                        error={errors.bairro}
                        {...register('bairro')}
                    />

                    <Input
                        name="cidade"
                        type="text"
                        label="Cidade"
                        value="São Sebastião"
                        {...register('cidade')}
                        isReadOnly={true}

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