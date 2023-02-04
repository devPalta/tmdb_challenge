import React from "react";
import { Flex, Box, useColorMode, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Logo, SearchBar } from "@components";

import Link from "next/link";

export const Header: React.FC = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex
            justifyContent="space-around"
            alignItems="center"
            gap="2"
            flex={1}
            padding={5}
        >
            <Box flex={8} alignItems="center">
                <Link href="/">
                    <Logo />
                </Link>
            </Box>
            <Box flex={3}>
                <SearchBar></SearchBar>
            </Box>
            <Box flex={0.3} onClick={toggleColorMode}>
                <IconButton
                    aria-label="toggle color mode"
                    icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                ></IconButton>
            </Box>
        </Flex>
    );
};
