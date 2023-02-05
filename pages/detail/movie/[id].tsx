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
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ApiService } from "src/api/apiService";
import { useFavItemsStore, useSelections } from "src/store";

const Movie: React.FC = () => {
    const router = useRouter();
    const { lastSelected, addItem } = useSelections();
    const { data, refetch } = useQuery(["movie"], () =>
        ApiService.get(`/movie/${router.query.id ?? lastSelected()}`).then(
            (res) => res.data,
        ),
    );
    useEffect(() => {
        router.query.id && refetch();
    }, [router.query.id]);
    useEffect(() => {
        data && addItem(data);
    }, [data]);
    const { favoriteItemsObject } = useFavItemsStore();
    useEffect(() => {
        return;
    }, [favoriteItemsObject]);
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
                            alt={`poster ${data.title}`}
                        />
                    )}

                    <Stack>
                        <CardBody display="flex" flexDir="column">
                            {data && (
                                <Flex gap={5} alignItems="center">
                                    <Heading size="md">{data?.title}</Heading>
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
                                    Relase Date:
                                    <Tag ml={1}>
                                        {data && data.release_date}
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
                                    Go to Movie
                                </Button>
                            </a>
                        </CardFooter>
                    </Stack>
                </Card>
            </Flex>
        </>
    );
};

export default Movie;
