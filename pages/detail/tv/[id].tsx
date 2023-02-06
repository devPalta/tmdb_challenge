import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    Flex,
    Heading,
    Image,
    Stack,
    Tag,
    Text,
} from "@chakra-ui/react";
import { FavToogler } from "@components/favoriteToggle";
import { useQuery, dehydrate, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ApiService } from "src/api/apiService";
import { useFavItemsStore, useSelections } from "src/store";
const Tv: React.FC = () => {
    const router = useRouter();
    const { lastSelected, addItem } = useSelections();
    const { data, refetch } = useQuery(
        ["tv"],
        () =>
            ApiService.get(
                `/tv/${router?.query?.id ? router?.query?.id : lastSelected()}`,
            ).then((res) => res.data),
        {
            onSuccess: (data) => addItem(data),
        },
    );

    const { favoriteItemsObject } = useFavItemsStore();
    useEffect(() => {
        return;
    }, [favoriteItemsObject, data]);
    useEffect(() => {
        router.query.id && refetch();
    }, [router.query.id]);
    return (
        <>
            <Flex minHeight="100vh" flexDir="column">
                <Card
                    direction={{ base: "column", sm: "row" }}
                    overflow="hidden"
                    variant="outline"
                >
                    {data && (
                        <Image
                            objectFit="cover"
                            maxW={{ base: "100%", sm: "500px" }}
                            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                            alt={`poster ${data.name}`}
                        />
                    )}

                    <Stack>
                        <CardBody display="flex" flexDir="column">
                            {data && (
                                <Flex gap={5} alignItems="center">
                                    <Heading size="md">{data?.name}</Heading>
                                    <FavToogler item={data} />
                                </Flex>
                            )}
                            <Box>
                                {data &&
                                    data.genres?.map(
                                        (genre: {
                                            id: number;
                                            name: string;
                                        }) => (
                                            <Tag
                                                size="md"
                                                key={genre.id}
                                                variant="solid"
                                                colorScheme="teal"
                                                m={2}
                                            >
                                                {genre.name}
                                            </Tag>
                                        ),
                                    )}
                            </Box>
                            <Flex gap={2}>
                                <Box>
                                    Rate :
                                    <Tag ml={1}>
                                        {data &&
                                            Number(data.vote_average).toFixed(
                                                2,
                                            )}
                                    </Tag>
                                </Box>
                                <Box>
                                    Popularity :
                                    <Tag ml={1}>{data && data.popularity}</Tag>
                                </Box>
                                <Box>
                                    Last Air:
                                    <Tag ml={1}>
                                        {data && data.last_air_date}
                                    </Tag>
                                </Box>
                                <Box>
                                    Seasons:
                                    <Tag ml={1}>
                                        {data && data.number_of_seasons}
                                    </Tag>
                                </Box>
                                <Box>
                                    Episodes:
                                    <Tag ml={1}>
                                        {data && data.number_of_episodes}
                                    </Tag>
                                </Box>
                            </Flex>

                            <Text py="2">{data?.overview}</Text>
                            {data && (
                                <Image
                                    objectFit="cover"
                                    maxW={{ base: "100%", sm: "500px" }}
                                    src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                                    alt={`poster ${data.name}`}
                                    borderRadius="lg"
                                />
                            )}
                        </CardBody>

                        <CardFooter>
                            <a
                                href={data && data.homepage}
                                target={"_blank"}
                                rel={"noreferrer"}
                            >
                                <Button variant="solid" colorScheme="blue">
                                    Go to Serie
                                </Button>
                            </a>
                        </CardFooter>
                    </Stack>
                </Card>
            </Flex>
        </>
    );
};

export default Tv;

export const getServerSideProps = async (ctx: { params: { id: any } }) => {
    const { id } = ctx.params;

    const queryClient = new QueryClient();

    // prefetch data on the server
    await queryClient.fetchQuery(["tv", id], () =>
        ApiService.get(`/tv/${id}`).then((res) => res.data),
    );

    return {
        props: {
            // dehydrate query cache
            dehydratedState: dehydrate(queryClient),
        },
    };
};
