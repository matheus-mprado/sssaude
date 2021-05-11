import { Flex, Stack, Button, Text, InputGroup, InputRightElement, Box } from "@chakra-ui/react";
import { Input } from "../components/form/Input";
import { Select } from "../components/form/select";
import axios from "axios";
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import storage from 'local-storage-fallback'

import { api } from "../service/api";
import { Checkbox } from "../components/Checkbox";
import Head from "next/head";


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
    logradouro: string;
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
        
    cpf: yup.string()
        .required('CPF Obrigatório')
        .min(14, "Digite seu CPF")
        .max(14, "Digite seu CPF"),

    email: yup.string()
        .required('E-mail obrigatório')
        .email('E-mail Inválido'),

    dateBorn: yup.string()
        .required('Insira uma data'),

    fone: yup.string()
        .required('Número Obrigatório')
        .min(8, "Digite um número válido")
        .max(255, "Digite um número Menor"),

    doenca: yup.string()
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

    accept: yup.boolean()
        .required("Necessário aceitar os termos.").oneOf([true], 'Necessário Aceitar os termos')
})

export default function Cadastro() {

    const { getValues, setValue, register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(signInFormSchema)
    });

    const [selectGenero, setSelectGenero] = useState('')
    const [selectDoenca, setSelectDoenca] = useState('')
    const [selectRaca, setSelectRaca] = useState('')
    const [cep, setCep] = useState(0)
    const [accept, setAccept] = useState(false)
    const [gestante, setGestante] = useState(false)
    const [puerpera, setPuerpera] = useState(false)
    const [idade, setIdade] = useState(0)
    const [isFoneResidencial, setIsFoneResidencial] = useState(0);

    const [cepData, setCepData] = useState<CepData>({} as CepData)
    const [bairro, setBairro] = useState('');

    const [categorys, setCategorys] = useState([])

    const router = useRouter();

    const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
        console.log("teste")

        api.post('/', values)
            .then(response => response.data === 'ok' && router.push("/sucesso"))
            .catch(err => console.log(err))

        storage.setItem("saudeSS", JSON.stringify(values))
    }

    function handleSetCEP(cep: number) {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => setCepData(response.data))
            .catch(err => console.log('Não localizado'))
        console.log(cepData)
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
        <>
            <Head>
                <title>Cadastro Comorbidades | Prefeitura de São Sebastião</title>
                <link rel="shortcut icon" href="/favicon.png" type="image/png" />
            </Head>
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
                            name="cpf"
                            type="text"
                            label="CPF"
                            error={errors.cpf}
                            {...register('cpf')}
                            mask="***.***.***/**"
                        />

                        <Input
                            name="dateBorn"
                            type="text"
                            label="Data de Nascimento"
                            error={errors.dateBorn}
                            {...register('dateBorn')}
                            mask="**/**/****"

                        />

                        <Input
                            name="fone"
                            type="text"
                            label="Telefone Celular (WhatsApp)"
                            error={errors.fone}
                            mask={"(**) * **** - ****"}
                            {...register('fone')}
                        />

                        <Input
                            name="email"
                            type="email"
                            label="Email"
                            error={errors.email}
                            {...register('email')}
                        />
                        <Select
                            name="genero"
                            label="Sexo"
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
                            name="doenca"
                            label="Categoria"
                            error={errors.doenca}
                            {...register('doenca')}
                            {...setValue("doenca", selectDoenca)}
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

                        <Checkbox
                            name="gestante"
                            {...register('gestante')}
                            isChecked={gestante}
                            onChange={() => setGestante(!gestante)}
                        >
                            <Text fontSize="small">
                                Gestante
                        </Text>
                        </Checkbox>

                        <Checkbox
                            name="puerpera"
                            {...register('puerpera')}
                            isChecked={puerpera}
                            onChange={() => setPuerpera(!puerpera)}
                        >
                            <Text fontSize="small">
                                Puérpera (Mulheres com até 45 dias após o parto)
                            </Text>
                        </Checkbox>
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
                            {...setValue('logradouro', cepData.logradouro)}
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
                            {...setValue('bairro', cepData.bairro)}
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
                        isChecked={accept}
                        error={errors.accept}
                        onChange={() => setAccept(!accept)}
                    >
                        <Text fontSize="small">
                            Eu aceito
                        </Text>
                    </Checkbox>

                    <Button
                        type="submit"
                        mt="6"
                        colorScheme="blue"
                        size="lg"
                        isLoading={isSubmitting}
                    // onClick={()=>teste()}
                    >
                        Cadastrar
                </Button>
                </Flex>
            </Flex >
        </>
    )
}