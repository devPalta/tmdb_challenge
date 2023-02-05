import React from "react";
import { MOVIE } from "src/interfaces/movie";
import { TV } from "src/interfaces/tv";
import { Flex, Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FavToogler } from "@components/favoriteToggle";

export const CommonCard: React.FC<{ item: MOVIE | TV }> = (props) => {
    const { item } = props;

    const router = useRouter();
    return (
        <Flex
            flexDir="column"
            key={item.id}
            bg="blackAlpha.700"
            borderRadius={10}
        >
            <Flex
                flexDir="column"
                onClick={() =>
                    router.push(
                        `/detail/${item?.name ? "tv" : "movie"}/${item.id}`,
                    )
                }
                bg="blackAlpha.700"
                borderRadius={10}
            >
                <Box
                    flex={1}
                    color="white"
                    minH={"48px"}
                    alignItems="center"
                    display="flex"
                    justifyContent="center"
                >
                    <Heading size="sm" textAlign="center">
                        {item.name || item.title}
                    </Heading>
                </Box>
                <Box flex={1}>
                    <Image
                        alt={item.name || item.title}
                        src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                        width={350}
                        height={235}
                        quality={45}
                    ></Image>
                </Box>
            </Flex>

            <FavToogler item={item} />
        </Flex>
    );
};
