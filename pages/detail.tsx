import React from "react";
import { Spacer, Flex } from "@chakra-ui/react";

import { Header, Main, Cards, Footer } from "@components";

const Detail: React.FC = () => {
    return (
        <Flex direction="column" minH="100vh">
            Detail view - display a detailed info about movie/serie
        </Flex>
    );
};

export default Detail;
