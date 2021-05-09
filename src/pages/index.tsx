import Link from 'next/link'
import { Button, Flex, Text, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex
      flexDir="column"
      px="6"
      py="4"
      align="center"
      justify="center"
      w="100%"
    >
      <Text
        fontWeight="600"
        fontSize="2xl"
        textAlign="center"
        my="12"
      >
        Bem-vindo Ao sistema de vacina
      </Text>

      <VStack spacing="8">
        <Link href="/Cadastro">
          <Button
            as="a"
          >
            Cadastre-se
          </Button>
        </Link>

        <Button>
          Consultar Agendamento
        </Button>

        <Button>
          Vacinas Remanecentes
        </Button>
      </VStack>

    </Flex>
  )
}
