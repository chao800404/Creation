import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import { GlobalStyle } from '../src/components/globalstyles'
import { Session } from 'next-auth'
import DashboardLayout from '../src/components/layout/dashboardLayout'
import { useListSWR } from '../src/hook/useListSWR'

const theme: DefaultTheme = {
  colors: {
    primary: '#111',
    secondary: '#0070f3',
  },
}

export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session
}>) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
        </Head>
        <GlobalStyle />
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </>
  )
}
