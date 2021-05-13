import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { ContentPages } from "../components/utils/ContentPages";
import { listCategorys } from "../components/utils/listCategorys";

export default function TableListCategorys() {



    return (
        <ContentPages
            title="lista comorbidades"
            back
        >
            <VStack spacing="6" w="100%" mt="4"> 


                {listCategorys.map(item => {
                    return (
                        <Flex
                            w="100%"
                            borderRadius="8"
                            key={item.id}
                            border="1px solid #eaeaea"
                            flexDir="column"
                        >
                            <Box
                                w="100%"
                                borderBottom="1px solid #eaeaea"
                                px="4"
                                py="2"

                            >
                                <Text
                                    fontWeight="600"
                                    color="#0c4ffd"
                                    fontSize="lg"
                                    textTransform="uppercase"
                                >
                                    {item.name}
                                </Text>
                            </Box>

                            <Text
                                px="4"
                                py="2"
                                color="#7a7a7a"
                                fontSize="medium"
                                lineHeight="1.75rem"
                                
                            >
                                {item.text}
                            </Text>

                        </Flex>
                    )
                })}
            </VStack>
        </ContentPages>
    )
}