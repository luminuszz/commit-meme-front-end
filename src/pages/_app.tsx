import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

import "../styles/globals.css";
import { theme } from "../styles/theme";

export type NextPageWithLayout<T = any> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
  pageTitle?: string;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const defaultTitle = "Commit-Meme";

  const getTitle =
    `${defaultTitle} | ${Component.pageTitle} ` ?? `${defaultTitle}`;

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{getTitle}</title>
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
}
export default MyApp;
