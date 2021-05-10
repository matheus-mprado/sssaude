import Link from 'next/link'
import { Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import storage from 'local-storage-fallback'
import Head from 'next/head';


export default function Home() {
  return (
    <>
      <Head>
        <title>Início | Prefeitura de São Sebastião</title>
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
          py="2"
        >
          SECRETARIA DE SAÚDE
      </Text>

        <Flex
          w="100%"
          flexDir="column"
          align="center"
          px="4"
          py="4"
          bg="white"
          h={["calc(100vh  - 35px)", "100%"]}
          borderRadius="2rem 2rem 0 0"
        >
          <Text
            fontSize="3xl"
            fontWeight="700"
            color="#0c4ffd"
          >
            CENTRAL DA VACINA
        </Text>
          <Text
            align-self="flex-start"
            fontSize="xl"
            fontWeight="600"
            my="2"

          >
            FAÇA SEU CADASTRO
        </Text>

          <Link href="/Cadastro" passHref>
            <Button
              w="100%"
              py="7"
              as="a"
              bg="#0c4ffd"
              mt="2"
              cursor="pointer"
            >
              <Text
                textTransform="uppercase"
                fontSize="xl"
                color="white"
              >
                PESSOAS COM COMORBIDADES
            </Text>
            </Button>
          </Link>

          {storage.getItem('saudeSS') &&


            < Link href="/sucesso" passHref>
              <Button
                w="100%"
                py="7"
                as="a"
                bg="#0c4ffd"
                mt="6"
                cursor="pointer"
              >
                <Text
                  textTransform="uppercase"
                  fontSize="xl"
                  color="white"
                >
                  verificar status
                </Text>
              </Button>
            </Link>

          }

          <Link href="http://saude.saosebastiao.sp.gov.br/" passHref>
            <Button
              w="100%"
              py="7"
              as="a"
              bg="#f7b52d"
              mt="6"
              cursor="pointer"

            >
              <Text
                textTransform="uppercase"
                fontSize="xl"
                fontWeight="700"
                color="#0038c8"
              >
                VACINAS REMANESCENTES
            </Text>
            </Button>

          </Link>




          <Image
            src="/ilustra.svg"
            h="100%"
          />
          <Flex
            position="absolute"
            bottom="0"
            w="100%"
          >

            <Flex
              h="8rem"
              bg="#f7b52d"
              w="100%"
              align="center"
              justify="center"
            >
              <Image
                src="/logos.png"
                alt="logos"
                mt="-100px"
                align="center"
                height="175px"
              />

            </Flex>
          </Flex>

        </Flex>


      </Flex >
    </>
  )
}
