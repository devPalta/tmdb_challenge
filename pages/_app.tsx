import React, { useRef } from "react";
import { AppProps } from "next/app";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Hydrate } from "@tanstack/react-query";
import { Header, Footer } from "@components";
import theme from "@definitions/chakra/theme";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@styles/global.scss";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const queryClient = useRef(new QueryClient());

    return (
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient.current}>
                <ReactQueryDevtools initialIsOpen={false} />
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
