import React, { useEffect } from "react";
import { Section } from "@components/section";
import { Flex } from "@chakra-ui/react";

const Home: React.FC = () => {
    return (
        <Flex direction="column" minH="100vh" flex={1}>
            Home view - display 3 rows <br />
            <br />
            <br />
            <Section title="My List" />
            <Section
                title="Trending series"
                queryKey={"tvs"}
                endpoint={"/tv/popular"}
            />
            <Section
                title="trending movies"
                queryKey={"movies"}
                endpoint={"/movie/popular"}
            />
        </Flex>
    );
};

export default Home;
