import Link from 'next/link'
import { Button, Text } from '@chakra-ui/react'

interface ButtonLinksProps{
    name:string;
    color?:boolean;
    link:string;
}

export function ButtonLinks({ name, color, link }:ButtonLinksProps) {
    return (
        <Link href={`${link}`} passHref>
            <Button
                w="100%"
                py="7"
                as="a"
                bg={color ? '#0c4ffd ': '#f7b52d'}
                mt="6"
                cursor="pointer"
                _hover={{
                    filter: "brightness(0.90)"
                }}
            >
                <Text
                    textTransform="uppercase"
                    fontSize="xl"
                    fontWeight="700"
                    color="gray.50"
                >
                    {name}
                </Text>
            </Button>

        </Link>
    )
}