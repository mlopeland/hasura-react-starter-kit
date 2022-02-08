import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { IocProvider } from '../hooks';

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IocProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </IocProvider>
  )
}

export default MyApp
