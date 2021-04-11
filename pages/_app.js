import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import PlausibleProvider from 'next-plausible'

import '../styles/globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }
  render() {
    const { Component, pageProps } = this.props

    const Layout = Component.layout || (({ children }) => <>{children}</>)

    return (
      <>
        <PlausibleProvider domain="front-matter.io">
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>Front Matter</title>
            <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PlausibleProvider>
      </>
    )
  }
}
