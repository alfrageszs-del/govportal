import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // Фикс для WebAssembly ошибки
    if (typeof window !== 'undefined') {
      window.WEB_ASSEMBLY_LOADED = true
    }
  }, [])

  return <Component {...pageProps} />
}