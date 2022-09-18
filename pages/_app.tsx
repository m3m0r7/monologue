import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react"
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import "@/css/mixin.scss"
import "@/css/styles.scss"
import "@fortawesome/fontawesome-free/css/all.css"
import { Session } from "next-auth";

const App: NextPage<AppProps<{ session: Session }>> = ({ Component,   pageProps: { session, ...pageProps } }) => {
  const apolloClient = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={apolloClient}>
    <SessionProvider session={session}>
      <Head>
        <meta name="viewport” content=”width=device-width,initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700;800;900&display=swap"
          rel="stylesheet"
          integrity="sha384-u6hIgRZ/reciX12F2XlDw1e57WFqVuCqnMce6bwBYA/bYDqHEqQOaKpI5yOVbkxJ"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <title>{process.env.NEXT_PUBLIC_WEB_TITLE}</title>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  </ApolloProvider>
}

export default App
