import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Menu } from '../components/menu/menu'

function MyApp({ Component, pageProps }: AppProps) {
  return <><Component {...pageProps} /><Menu /></>
}

export default MyApp
