import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { IocProvider, SessionProvider } from '../hooks';

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <IocProvider>
        <SessionProvider>
          <Component {...pageProps} />
        </SessionProvider>
      </IocProvider>
    </ChakraProvider>
  )
}

export default MyApp
