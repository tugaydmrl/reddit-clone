import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';

import { theme } from '../chakra/theme';
import Layout from '../components/Layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp
