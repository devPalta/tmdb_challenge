import React, { CSSProperties } from "react";
import Image from "next/image";
import { Flex, Center, useColorModeValue, Text, Box } from "@chakra-ui/react";

export const Footer: React.FC = () => {
    const AvokadoImg = "/icons/avocado.png";

    const iconStyle: CSSProperties = {
        fontSize: 22,
        color: "#fff",
        marginRight: "0.25rem",
        marginLeft: "0.25rem",
    };
    return (
        <Center bg="main.100" py={10}>
            <Flex flexDirection="column">
                <a
                    href="https://github.com/devPalta/tmdb_challenge"
                    target="_blank"
                    className="footer-link-animated"
                >
                    <Box display="flex" alignItems="center" gap={2}>
                        <Image
                            src={AvokadoImg}
                            width={20}
                            height={20}
                            alt="AvocadoPalterLogo"
                        ></Image>
                        <Text
                            color={"whiteAlpha.900"}
                            fontFamily="M PLUS Rounded 1c"
                            fontWeight="bold"
                            display="flex"
                            textAlign="center"
                            marginBottom={0}
                        >
                            devPalta
                        </Text>
                    </Box>
                </a>
                <Flex mt={5} justifyContent="center">
                    <a
                        href="https://github.com/devPalta/tmdb_challenge"
                        target="_blank"
                        style={iconStyle}
                    >
                        <Image
                            src="/icons/github-icon.svg"
                            alt="github"
                            width="28"
                            height="29"
                        />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/walter-luna-7ba08872/"
                        target="_blank"
                        style={iconStyle}
                    >
                        <Image
                            src="/icons/linkedin-icon.svg"
                            alt="linkedin"
                            width="28"
                            height="32"
                        />
                    </a>
                </Flex>
            </Flex>
        </Center>
    );
};
