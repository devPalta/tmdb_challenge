import React from "react";
import { Flex } from "@chakra-ui/react";
import { Section } from "@components/section";

const Home: React.FC = () => {
    return (
        <Flex direction="column" minH="100vh">
            Home view - display 3 rows <br />
            <br />
            <br />
            <Section title="My List" data={[{ id: 0, name: "fav element" }]} />
            <Section
                title="Trending series"
                data={[{ id: 0, name: "tv serie element" }]}
            />
            <Section
                title="trending movies"
                data={[{ id: 0, name: "movie element" }]}
            />
        </Flex>
    );
};

export default Home;
