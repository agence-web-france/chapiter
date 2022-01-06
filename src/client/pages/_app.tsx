import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import AdminLayout from '../components/admin/layout/layout'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  if (router.route.includes("/admin/")) {
    return <>
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    </>
  }

  return <Component {...pageProps} />
}

export default MyApp
