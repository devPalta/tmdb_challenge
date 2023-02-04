import React, { useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import { SimpleGrid, Box, Heading, Text } from "@chakra-ui/react";
import { components, DropdownIndicatorProps } from "react-select";
import { useRouter } from "next/router";
import { debounce } from "src/lib";
const DropdownIndicator = (
    props: DropdownIndicatorProps<{
        value: number;
        name: string;
        title: string;
        label: string;
    }>,
) => {
    return (
        <components.DropdownIndicator {...props}>
            <Search2Icon />
        </components.DropdownIndicator>
    );
};
import {
    AsyncCreatableSelect,
    AsyncSelect,
    CreatableSelect,
    Select,
} from "chakra-react-select";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "src/api/apiService";
export const SearchBar: React.FC = () => {
    const router = useRouter();
    const [searchInput, setSearchInput] = useState(String);
    const { data, isLoading } = useQuery(
        ["search", searchInput],
        () =>
            ApiService.get(`search/multi?&query=${searchInput}`).then(
                (res) => res.data,
            ),
        { enabled: Boolean(searchInput) },
    );
    return (
        <Select
            placeholder={"Search..."}
            onInputChange={debounce((e: string) => {
                setSearchInput(e);
                return e;
            })}
            options={data?.results?.map((i) => {
                return { ...i, value: i.id, label: i?.name ?? i?.title };
            })}
            //loadOptions={promiseOptions}
            // isLoading={loading}

            components={{ DropdownIndicator }}
            onChange={(e) => e && router.push("/detail")}
            isClearable
        ></Select>
    );
};
