import { Flex, IconButton, Text } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";

interface ContentPagesProps {
    title: string;
    back?: boolean;
    children: ReactNode;
    full?: boolean;
}

export function ContentPages({ title, back, children,full }: ContentPagesProps) {
    return (
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
                py={back ? "4" : "2"}
                textTransform="uppercase"
            >
                {title}
            </Text>

            {back &&
                (<Link href="/" passHref>
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
                </Link>)
            }
            <Flex
                w="100%"
                flexDir="column"
                align="center"
                px="4"
                py="4"
                bg="white"
                h={full ? ["calc(100vh  - 35px)", "100%"] : "100%"}
                borderRadius="2rem 2rem 0 0"
            >
                {children}
            </Flex>
        </Flex>
    )
}