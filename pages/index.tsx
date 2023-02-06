import React from "react";
import { Section } from "@components/section";
import { Flex } from "@chakra-ui/react";
import { DiscoverSection } from "@components/discover";
import { useQuery, dehydrate, QueryClient } from "@tanstack/react-query";
import { ApiService } from "src/api/apiService";

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

export const getServerSideProps = async () => {
    const queryClient = new QueryClient();

    // prefetch data on the server
    await queryClient.fetchQuery(["movies"], () =>
        ApiService.get("/movie/popular").then((res) => res.data),
    );
    await queryClient.fetchQuery(["tvs"], () =>
        ApiService.get("/tv/popular").then((res) => res.data),
    );

    return {
        props: {
            // dehydrate query cache
            dehydratedState: dehydrate(queryClient),
            refetchOnWindowFocus: false,
        },
    };
};
