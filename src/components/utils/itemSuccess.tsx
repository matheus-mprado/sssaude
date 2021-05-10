import { Flex, Text } from "@chakra-ui/layout";

export function ItemSuccess({type, value}) {
    return (
        <Flex
            align="center"
        >
            <Text
                fontWeight="700"
                fontSize="lg"
            >
                {type}:
                        </Text>
            <Text ml="2" fontSize="lg">
                {value}
            </Text>
        </Flex>
    )
}