import Script from 'next/script'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
    <Script 
      async
      defer
      data-website-id="a6cc6ca8-3376-4035-8f2a-fbed75fdf1e8"
      src="https://umami-production-7b7f.up.railway.app/umami.js" />
    <Component {...pageProps} />
  </>
}

export default MyApp
