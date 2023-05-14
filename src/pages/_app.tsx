import { AppProps } from 'next/app'
import Head from 'next/head'
import NextNProgress from 'nextjs-progressbar'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'
import { PRIMARY_COLOR } from '../util/constants'
import { EarlyAccessModalProvider } from '../context/EarlyAccessModalContext'
import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { TEST_API_URL } from '../util/constants'
import {AppProvider} from "../context/AdminContext";
import CookieConsent from "react-cookie-consent";

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    (async () => {
      setMounted(true)

      if (!localStorage.getItem('session_key')) {
        const sessionData = await axios.post(`${TEST_API_URL}/session/create`)

        if (sessionData.data.Success) {
          localStorage.setItem('session_key', sessionData.data.Data.session as string)
        }
      }
    })()
  }, [])
  if (!mounted) return null
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=1, viewport-fit=cover"
        />
      </Head>
      {/* Progress Bar */}
      <NextNProgress
        color={PRIMARY_COLOR}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Toaster />
      <ThemeProvider attribute="class" enableSystem={true}>
        <EarlyAccessModalProvider>
            <AppProvider>
            <Component {...pageProps} />
            <CookieConsent
              location="bottom"
              buttonText="I accept"
              cookieName="cookieConsent"
              buttonStyle={{
                color: '#fff',
                background: '#A855F7',
              }}
            >
                This website uses cookies to enhance the user experience.
            </CookieConsent>
            </AppProvider>
        </EarlyAccessModalProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
