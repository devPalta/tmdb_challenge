import React from "react";
import {
    Flex,
    Box,
    useColorMode,
    IconButton,
    useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Logo, SearchBar } from "@components";

import Link from "next/link";

export const Header: React.FC = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue("white", "gray.800");

    return (
        <Flex
            justifyContent="space-around"
            alignItems="center"
            gap="2"
            flex={1}
            paddingX={5}
            marginTop={5}
            minHeight="80px"
            direction={{ base: "column", md: "row" }}
            position="sticky"
            top={0}
            bg={bg}
            zIndex={100}
        >
            <Box flex={8} alignItems="center" minW="200px">
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
