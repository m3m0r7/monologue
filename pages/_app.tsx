import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";

const App: NextPage<AppProps> = (props: AppProps) => {
  return <>
    <Head>
      <title>{process.env.NEXT_PUBLIC_WEB_TITLE}</title>
    </Head>
    <h1>Hello World!</h1>
  </>
}

export default App
