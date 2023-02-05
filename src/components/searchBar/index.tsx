import React, { useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import {
    Box,
    IconButton,
    Flex,
    useDisclosure,
    Collapse,
    RadioGroup,
    Stack,
    Radio,
    Tooltip,
    useColorModeValue,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { components, DropdownIndicatorProps } from "react-select";
import { useRouter } from "next/router";
import { MOVIE } from "src/interfaces/movie";
import { TV } from "src/interfaces/tv";
import { Select, SingleValue } from "chakra-react-select";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "src/api/apiService";
import { useDebounce } from "src/lib/debounce";
const DropdownIndicator = (
    // add custom DropdownIndicator
    props: DropdownIndicatorProps<
        | TV
        | MOVIE
        | {
              value: number;
              name: string;
              title: string;
              label: string;
              media_type: string;
              id: number;
          }
    >,
) => {
    return (
        <components.DropdownIndicator {...props}>
            <Search2Icon />
        </components.DropdownIndicator>
    );
};

export const SearchBar: React.FC = () => {
    const router = useRouter();
    const [searchInput, setSearchInput] = useState(String);
    const { data } = useQuery(
        ["search", searchInput],
        () =>
            ApiService.get(
                `search/${
                    isOpen && filter.length > 0 && filter ? filter : "multi" // check if filter is active
                }?&query=${searchInput}`,
            ).then((res) => res.data),
        { enabled: Boolean(searchInput) },
    );
    const { isOpen, onToggle } = useDisclosure();
    const [filter, setFilter] = useState(String);
    const _onChangeDebounced = async (text: string) => {
        text && setSearchInput(text);
    };
    const onChangeDebounced = useDebounce(_onChangeDebounced);
    const filterBg = useColorModeValue("blue.100", "#85cba8");

    return (
        <Flex flex={1} alignItems="center" display="flex">
            <Box
                flex={1}
                display="flex"
                flexDirection="row"
                alignItems="center"
                minWidth="270px"
            >
                <Select
                    // TODO  HANDLE CUSTOM FILTER WITH filterOption={createFilter(filterConfig)}
                    placeholder={"Search..."}
                    onInputChange={onChangeDebounced}
                    options={data?.results?.map(
                        (i: {
                            id?: number;
                            name?: string;
                            title?: string;
                            media_type?: string;
                        }) => {
                            return {
                                ...i,
                                value: i.id,
                                label: i?.name ?? i?.title,
                            };
                        },
                    )}
                    components={{ DropdownIndicator }}
                    onChange={(
                        e: SingleValue<
                            | MOVIE
                            | TV
                            | {
                                  media_type?: string;
                                  id?: number;
                              }
                        > | null,
                    ) =>
                        e &&
                        router.push(
                            `/detail/${e?.media_type ?? filter}/${e?.id}`,
                        )
                    }
                    isClearable
                    className="searchbar-main-wrapper"
                    isMulti={false}
                ></Select>
            </Box>
            <Box flex={0.2} display="flex" alignItems="center">
                <Tooltip
                    hasArrow
                    label="Filter options"
                    bg="gray.200"
                    color="black"
                >
                    <IconButton
                        variant="link"
                        aria-label="search config"
                        icon={<SettingsIcon />}
                        onClick={onToggle}
                    />
                </Tooltip>
                <Collapse in={isOpen}>
                    <Box p="2" my="1" rounded="md" shadow="md" bg={filterBg}>
                        <RadioGroup onChange={setFilter} value={filter}>
                            <Stack>
                                <Radio value="movie">Movies</Radio>
                                <Radio value="tv">Series</Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>
                </Collapse>
            </Box>
        </Flex>
    );
};
