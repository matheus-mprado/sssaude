import Link from 'next/link'
import { Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import storage from 'local-storage-fallback'
import Head from 'next/head';
import { ContentPages } from '../components/utils/ContentPages';
import { ButtonLinks } from '../components/utils/ButtonLinks';


export default function Home() {
  return (
    <>
      <Head>
        <title>Início | Prefeitura de São Sebastião</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />

      </Head>


      <ContentPages title="SECRETARIA DE SAÚDE">
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

        <ButtonLinks
          color
          link="Cadastro"
          name="PESSOAS COM COMORBIDADE"
        />

        {storage.getItem('saudeSS') &&
          <ButtonLinks
            color
            link="sucesso"
            name="verificar status"
          />
        }

        <ButtonLinks
          link="http://saude.saosebastiao.sp.gov.br/"
          name="PESSOAS COM COMORBIDADE"
        />


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

      </ContentPages>
    </>
  )
}
