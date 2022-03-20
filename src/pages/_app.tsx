import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <section className="p-4 max-w-5xl mx-auto">
      <Component {...pageProps} />
    </section>
  )
}

export default MyApp;
