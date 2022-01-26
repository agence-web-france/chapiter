import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PrimaryMenu, SecondaryContentMenu } from '../components/menu/menu'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <SecondaryContentMenu />
    <Component {...pageProps} />
    <PrimaryMenu />
  </>
}

export default MyApp
