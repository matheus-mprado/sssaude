import { Flex, Stack, Button, Text, InputGroup, InputRightElement, Box } from "@chakra-ui/react";
import { Input } from "../components/form/Input";
import { Select } from "../components/form/select";
import axios from "axios";
import * as yup from 'yup'
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { api } from "../service/api";
import { Checkbox } from "../components/Checkbox";


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

interface CepData {
    bairro: string;
    cep: string;
    localidade: string;
}

interface Categoria {
    id: string;
    category: string;
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

    dateBorn: yup.string()
        .required('Insira uma data'),

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
    const [selectDoenca, setSelectDoenca] = useState('')
    const [selectRaca, setSelectRaca] = useState('')
    const [cep, setCep] = useState(0)
    const [accept, setAccept] = useState(false)
    const [cepData, setCepData] = useState<CepData>({} as CepData)
    const [categorys, setCategorys] = useState([])



    const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
        await new Promise(resolve => setTimeout(resolve, 2000));

        api.post('/', values)
            .then(response => console.log(response))
            .catch(err => console.log(err))

        console.log(values)
    }

    function handleSetCEP(cep: number) {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => setCepData(response.data))
            .catch(err => console.log('Não localizado'))
    }

    function getCategorys() {
        api.get('/categorias/')
            .then(response => setCategorys(response.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getCategorys()
    }, [])

    return (
        <Flex
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

                <Stack spacing="8">
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
                        type="text"
                        label="Data de Nascimento"
                        error={errors.dateBorn}
                        {...register('dateBorn')}
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

                    <Select
                        name="doenca"
                        label="Doenca"
                        error={errors.doenca}
                        {...register('doenca')}
                        value={selectDoenca}
                        onChange={(e) => setSelectDoenca(e.target.value)}
                    >
                        <>
                            {categorys &&
                                categorys.map(category => {
                                    return (

                                        <option value={category.id} key={category.id}>{category.categoria}</option>

                                    )
                                })
                            }
                        </>
                    </Select>
                </Stack>


                <Text fontSize="medium" mb="4" mt="8" fontWeight="600">
                    2 - Endereço
                </Text>

                <Stack spacing="8" mb="8">
                    <Box
                        position="relative"
                    >
                        <Input
                            name="cep"
                            type="text"
                            label="CEP"
                            error={errors.cep}
                            {...register('cep')}
                            onChange={(e) => setCep(Number(e.target.value))}
                        />

                        <Button
                            size="sm"
                            onClick={() => handleSetCEP(cep)}
                            position="absolute"
                            right="0"
                            top="2.1rem"
                        >
                            procurar
                        </Button>

                    </Box>
                    <Input
                        name="logradouro"
                        type="text"
                        label="Logradouro"
                        error={errors.logradouro}
                        value={cepData ? cepData.localidade : ''}
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
                        value={cepData ? cepData.bairro : ''}
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

                <Checkbox
                    name="accept"
                    label="DECLARO, para fins de direto, sob as penas da lei, que as informações prestadas para esta solicitação, são verdadeiros e autênticas. Tendo a ciência de que todas as informações prestadas poderão ser utilizadas pelos sistemas de saúde municipais, estaduais e federais."
                    {...register('accept')}

                >
                    <Text fontSize="small">
                        Aceitar
                    </Text>
                </Checkbox>
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
        </Flex >
    )
}