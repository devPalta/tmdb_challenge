import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Header, Footer } from "@components";
import theme from "@definitions/chakra/theme";
import "@styles/global.scss";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const queryClient = new QueryClient();
    return (
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Header />
                    <Flex margin={5}>
                        <Component {...pageProps} />
                    </Flex>
                    <Footer />
                </Hydrate>
            </QueryClientProvider>
        </ChakraProvider>
    );
}

export default MyApp;
