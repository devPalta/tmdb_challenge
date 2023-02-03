import React, { useEffect, useState } from "react";
import {
    Flex,
    SimpleGrid,
    useColorModeValue,
    Heading,
    IconButton,
    useDisclosure,
    Box,
    Fade,
    RadioGroup,
    Radio,
    Tooltip,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "src/api/apiService";
import { CommonCard } from "..";
import { MOVIE } from "src/interfaces/movie";
import { TV } from "src/interfaces/tv";
import { SettingsIcon } from "@chakra-ui/icons";
import { useFavItemsStore } from "src/store";

export const DiscoverSection: React.FC = () => {
    const { data: MoviesData } = useQuery({
        queryKey: ["discoverMovies"],
        queryFn: () =>
            ApiService.get("/discover/movie").then((res) => res.data.results),
    });
    const { data: TvData } = useQuery({
        queryKey: ["discoverSeries"],
        queryFn: () =>
            ApiService.get("/discover/tv").then((res) => res.data.results),
    });
    const discoverBg = useColorModeValue("#9cd7d1", "#5A9FBD");
    const [filter, setFilter] = useState(String);
    const { isOpen, onToggle } = useDisclosure();
    const { favoriteItemsObject } = useFavItemsStore();
    useEffect(() => {
        return;
    }, [favoriteItemsObject]);
    return (
        <Flex
            direction="column"
            flex={1}
            bg={discoverBg}
            borderRadius="2xl"
            p={5}
            marginBottom={2}
        >
            <Box display="flex">
                <Heading size="md">Discover TV Series and Movies</Heading>
                <Tooltip label="Filter by">
                    <IconButton
                        variant="link"
                        aria-label="search config"
                        icon={<SettingsIcon />}
                        onClick={onToggle}
                    />
                </Tooltip>
                <Fade in={isOpen}>
                    <Box display="flex">
                        <RadioGroup ml={1} onChange={setFilter}>
                            <Radio mr={4} value="tv">
                                Tv Series
                            </Radio>
                            <Radio mr={4} value="movie">
                                Movies
                            </Radio>
                            <Radio value="">All</Radio>
                        </RadioGroup>
                    </Box>
                </Fade>
            </Box>

            <SimpleGrid
                flex={1}
                columns={{ base: 2, md: 6 }}
                spacing={{ base: 5, md: 10 }}
                px={{ base: 2, md: 20 }}
                py={{ base: 1, md: 10 }}
            >
                {filter.length === 0 &&
                    MoviesData &&
                    TvData &&
                    MoviesData.concat(TvData).map((item: MOVIE | TV) => (
                        <CommonCard key={item.id} item={item} />
                    ))}
                {filter === "tv" &&
                    TvData &&
                    TvData.map((item: MOVIE | TV) => (
                        <CommonCard key={item.id} item={item} />
                    ))}
                {filter === "movie" &&
                    MoviesData &&
                    MoviesData.map((item: MOVIE | TV) => (
                        <CommonCard key={item.id} item={item} />
                    ))}
            </SimpleGrid>
        </Flex>
    );
};
