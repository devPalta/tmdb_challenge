import React from "react";
import { SimpleGrid, Heading, Flex } from "@chakra-ui/react";

interface Props {
    title: string;
    data: Array<{
        genre_ids: Array<number>;
        name: string;
        id: number;
        overview: string;
    }>;
}
export const Section: React.FC<Props> = (SectionProps) => {
    const { title, data } = SectionProps;
    return (
        <Flex m={1} bg="blue.300">
            <Heading size="md">{title}</Heading>
            <SimpleGrid columns={4} spacing={10} px={20} py={10}>
                {data &&
                    data.map((item) => <div key={item.id}>{item.name}</div>)}
                Cards
            </SimpleGrid>
        </Flex>
    );
};
