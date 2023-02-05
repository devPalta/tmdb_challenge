import React from "react";
import { ApiService } from "src/api/apiService";
import { useQuery } from "@tanstack/react-query";
import {
    Heading,
    Flex,
    SimpleGrid,
    Skeleton,
    useColorModeValue,
} from "@chakra-ui/react";
import { MOVIE } from "src/interfaces/movie";
import { TV } from "src/interfaces/tv";
import { CommonCard } from "..";
import { useFavItemsStore } from "src/store";

interface Props {
    title: string;
    queryKey?: string;
    endpoint?: string;
    collection?: Array<MOVIE | TV>;
}

export const Section: React.FC<Props> = (SectionProps) => {
    const { title, queryKey, endpoint } = SectionProps;
    const { isLoading, data } = useQuery({
        queryKey: [queryKey],
        queryFn: () => ApiService.get(endpoint || "").then((res) => res.data),
        refetchOnWindowFocus: false,
        enabled: !!endpoint,
    });
    const { favoriteItemsObject } = useFavItemsStore();
    const sectionBg = useColorModeValue("blue.100", "#85cba8");

    return (
        <Flex
            marginBottom={2}
            flexDir="column"
            bg={sectionBg}
            flex={1}
            p={5}
            borderRadius="2xl"
        >
            <Heading size="md">{title}</Heading>
            <Skeleton
                isLoaded={!isLoading || !endpoint}
                minWidth={"100%"}
                borderRadius="xl"
                mt={2}
            >
                {data && (
                    <SimpleGrid
                        flex={1}
                        columns={{ base: 2, md: 5 }}
                        spacing={{ base: 5, md: 10 }}
                        px={{ base: 2, md: 20 }}
                        py={{ base: 1, md: 10 }}
                    >
                        {data.results.map((item: TV | MOVIE) => (
                            <CommonCard key={item.id} item={item}></CommonCard>
                        ))}
                    </SimpleGrid>
                )}
            </Skeleton>
            {!data && (
                <SimpleGrid
                    flex={1}
                    columns={{ base: 2, md: 5 }}
                    spacing={{ base: 5, md: 10 }}
                    px={{ base: 2, md: 20 }}
                    py={{ base: 1, md: 10 }}
                >
                    {favoriteItemsObject.map((item: MOVIE | TV) => (
                        <CommonCard key={item.id} item={item} />
                    ))}
                </SimpleGrid>
            )}
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
