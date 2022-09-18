import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react"

import "@/css/mixin.scss"
import "@/css/styles.scss"
import "@fortawesome/fontawesome-free/css/all.css"

const App: NextPage<AppProps> = ({ Component,   pageProps: { session, ...pageProps } }) => {
  return <SessionProvider session={session}>
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
}

export default App
