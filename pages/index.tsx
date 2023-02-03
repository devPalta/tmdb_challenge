import React from "react";
import { Flex } from "@chakra-ui/react";

const Home: React.FC = () => {
    return (
        <Flex direction="column" minH="100vh">
            Home view - display 3 rows <br></br>trending series <br></br>
            trending movies <br></br>
            favorite's section
        </Flex>
    );
};

export default Home;
