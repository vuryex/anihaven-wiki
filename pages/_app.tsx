import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AniHaven Wiki</title>
        <meta name="description" content="AniHaven Community Wiki and Resources" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <Layout config={pageProps.config}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}