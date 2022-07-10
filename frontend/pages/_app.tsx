import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { IocProvider, SessionProvider } from '../hooks';

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IocProvider>
      <SessionProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </IocProvider>
  )
}

export default MyApp
