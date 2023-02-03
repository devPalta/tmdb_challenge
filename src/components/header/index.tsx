import React from "react";
import { Flex, Center, Box, useColorMode, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { Logo } from "@components";
import Link from "next/link";

export const Header: React.FC = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex minWidth="max-content" alignItems="center" gap="2">
            <Box flex={20} alignItems="center">
                <Center padding={5}>
                    <Link href="/">
                        <Logo />
                    </Link>
                </Center>
            </Box>
            <Box flex={1} onClick={toggleColorMode}>
                <IconButton
                    aria-label="toggle color mode"
                    icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                ></IconButton>
            </Box>
        </Flex>
    );
};
