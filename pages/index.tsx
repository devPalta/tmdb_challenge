import React from "react";
import { Section } from "@components/section";
import { Flex } from "@chakra-ui/react";
import { DiscoverSection } from "@components/discover";

const Home: React.FC = () => {
    return (
        <Flex direction="column" minH="100vh" flex={1}>
            <DiscoverSection />
            <Section title="My List" />
            <Section
                title="Trending series"
                queryKey={"tvs"}
                endpoint={"/tv/popular"}
            />
            <Section
                title="Trending movies"
                queryKey={"movies"}
                endpoint={"/movie/popular"}
            />
        </Flex>
    );
};

export default Home;
