import React from "react";
import { ApiService } from "src/api/apiService";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { Heading, Flex, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { INTERNALS } from "next/dist/server/web/spec-extension/request";

interface Props {
    title: string;
    queryKey: string;
    endpoint: string;
}

export const Section: React.FC<Props> = (SectionProps) => {
    const { title, queryKey, endpoint } = SectionProps;
    const { isLoading, isError, data, refetch } = useQuery({
        queryKey: [queryKey],
        queryFn: () => ApiService.get(endpoint).then((res) => res.data),
        refetchOnWindowFocus: false,
    });
    return (
        <Flex m={1} bg="blue.300" flex={1} p={5}>
            <Heading size="md">{title}</Heading>
            <Skeleton isLoaded={!isLoading}>
                <SimpleGrid columns={6} spacing={10} px={20} py={10}>
                    {data &&
                        data.results.map(
                            (item: {
                                id: number;
                                name: string;
                                title: string;
                            }) => (
                                <div key={item.id}>
                                    {item.name || item.title}
                                </div>
                            ),
                        )}
                    Cards
                </SimpleGrid>
            </Skeleton>
        </Flex>
    );
};

/* 
TODO: add config to apply a kind of ssg with static generation 
export async function getStaticProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery([title], () =>
        ApiService.get(endpoint).then((res) => res),
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
} */
