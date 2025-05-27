import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../createEmotionCache';
import "../styles/globals.css";
import ThemeSwitcher from '@/styles/themeSwitcher';

// Client-side Emotion cache (shared across sessions)
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const App: React.FC<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

    {/* <ProtectedRoute></ProtectedRoute> */}
      <ThemeSwitcher>
        <Component {...pageProps} />
      </ThemeSwitcher>
    </CacheProvider>
  );
};

export default App;
