import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

export function ResultIMC({ values }) {
    const [statusImc, setStatusImc] = useState('');

    const { altura, peso } = values;
    const alturaMetro = (altura / 100)

    const imc = Number((peso / (alturaMetro * alturaMetro)).toFixed(1))

    let statusIMC

    if (imc < 18.5) {
        statusIMC = "Abaixo do Peso"
    } else if (imc >= 18.5 && imc <= 24.9) {
        statusIMC = "Peso Normal"
    } else if (imc >= 25 && imc <= 29.9) {
        statusIMC = "Sobrepeso"
    } else if (imc >= 30 && imc <= 34.9) {
        statusIMC = "Obesidade Grau I"
    } else if (imc >= 35 && imc <= 39.9) {
        statusIMC = "Obesidade Grau II"
    } else if (imc >= 40) {
        statusIMC = "Obesidade Grau III or Mórbida"
    }

    return (
        <Flex
            w="100%"
            pt="6"
        >
            <Flex
                flexDir="column"
                color="#0038c8"
                w="100%"
                align="center"
                justify="center"
                textAlign="center"

            >
                <Text
                    fontWeight="700"
                    fontSize="xl"
                >
                    Seu IMC é
                </Text>
                <Text
                    fontWeight="700"
                    fontSize="5xl"
                >
                    {imc} 
                </Text>
                <Text
                    fontWeight="700"
                    fontSize="xl"
                >
                    {statusIMC}
                </Text>
            </Flex>
        </Flex>
    )
}