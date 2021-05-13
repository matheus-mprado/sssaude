import { Flex, Image } from "@chakra-ui/react";

export function FooterHome() {
    return (
        <>
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
        </>
    )
}