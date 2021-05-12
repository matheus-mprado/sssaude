import { Flex, IconButton, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import storage from 'local-storage-fallback'
import Link from "next/link";
import Head from "next/head";

import { ItemSuccess } from "../components/utils/itemSuccess";
import { api } from "../service/api";
import { BiLeftArrowAlt } from "react-icons/bi";

interface UsuarioProps {
    accept: boolean;
    bairro: string;
    cep: number;
    cidade: string;
    cpf: string;
    dateBorn: string;
    doenca: string;
    email: string;
    fone: string;
    genero: string;
    gestante: boolean
    logradouro: string;
    nameMother: string;
    namePrimary: string;
    numero: number;
    puerpera: boolean;
    raca: string;
    work: string;
}

export default function Sucesso() {
    const [usuario, setUsuario] = useState({} as UsuarioProps);
    const [categorys, setCategorys] = useState([])

    const router = useRouter()


    function getCategorys() {
        api.get('/categorias/')
            .then(response => setCategorys(response.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (!storage.getItem('saudeSS')) {
            router.push("/")
        } else {
            setUsuario(JSON.parse(storage.getItem('saudeSS')));

        }
        getCategorys();
    }, [])


    return (
        <>
            <Head>
                <title>Em análise | Prefeitura de São Sebastião</title>
                <link rel="shortcut icon" href="/yellowcircle.png" type="image/png" />
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
                    STATUS DA SOLICITAÇÃO
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

                    py="8"
                    bg="white"
                    borderRadius="2rem 2rem 0 0"
                >
                    <Text
                        px="6"
                        fontSize="3xl"
                        fontWeight="700"
                        color="#00a837"
                        lineHeight="2.25rem"
                    >
                        Cadastro realizado com Sucesso!
                </Text>

                    <VStack
                        px="6"
                        flexDir="column"
                        mt="8"
                        spacing="2"
                        w="100%"
                        align="flex-start"

                    >
                        <ItemSuccess type="Nome" value={usuario.namePrimary} />
                        <ItemSuccess type="CPF" value={usuario.cpf} />
                        <ItemSuccess type="Nascimento" value={usuario.dateBorn} />
                        <ItemSuccess type="Status" value="Em análise" />
                    </VStack>

                    <Flex bg="gray.50" mt="6" flexDir="column" pb="4">
                        <Text
                            px="6"
                            py="4"
                        >
                            Seu cadastro foi realizado com sucesso <b>e recebido pela nossa equipe. No dia da vacinação,</b>
                            será necessário apresentar CPF, um documento com foto, <b>comprovante de endereço</b> e documento
                            que <b>certifique</b> a comorbidade.



                        </Text>

                        <Text
                            mt="2"
                            px="6"
                        >
                            Se no dia agendado, o munícipe não apresentar todos os documentos necessários, <Text as="span" textTransform="uppercase" color="red" fontWeight="600">A vacinação não será realizada.</Text>
                        </Text>

                    </Flex>

                    <Flex
                        bg="#0c4ffd"
                        px="6"
                        py="3"
                        align="center"
                        justify="center"
                        w="100%"
                        my="4"
                    >
                        <Text
                            textAlign="center"
                            color="white"
                            fontWeight="700"
                            fontSize="lg"
                        >
                            AGUARDE CONTATO PARA CONFIRMAR O AGENDAMENTO
                    </Text>
                    </Flex>

                    <Link href="/" passHref>

                        <Image
                            src="/logos.png"
                            alt="logos"
                            align="center"
                            height="175px"
                            margin="0 auto"
                            cursor="pointer"
                        />

                    </Link>
                </Flex>
            </Flex>
        </>
    )
}