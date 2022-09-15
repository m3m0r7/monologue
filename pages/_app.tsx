import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";

import "@/css/styles.scss"
import "@fortawesome/fontawesome-free/css/all.css"

const App: NextPage<AppProps> = (props: AppProps) => {
  const { Component, pageProps } = props

  return <>
    <Head>
      <title>{process.env.NEXT_PUBLIC_WEB_TITLE}</title>
    </Head>
    <Component {...pageProps} />
  </>
}

export default App
