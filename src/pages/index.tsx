import Link from 'next/link'
import { Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import storage from 'local-storage-fallback'
import Head from 'next/head';
import { ContentPages } from '../components/utils/ContentPages';
import { ButtonLinks } from '../components/utils/ButtonLinks';
import { FooterHome } from '../components/Home/FooterHome';


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

        <ButtonLinks
          color
          link="calculadoraIMC"
          name="Calculadora IMC"
        />

        <ButtonLinks
          link="TabelaComorbidades"
          color
          name="TABELA COMORBIDADES"
        />

        {storage.getItem('saudeSS') &&
          <ButtonLinks
            link="sucesso"
            name="verificar status"
          />
        }

        <ButtonLinks
          link="http://saude.saosebastiao.sp.gov.br/"
          name="PESSOAS COM COMORBIDADE"
        />




        <FooterHome />

      </ContentPages>
    </>
  )
}
