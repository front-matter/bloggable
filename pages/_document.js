import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/*  Social tags      */}
          <meta
            name="keywords"
            content="free template, free kit, free dashboard, free webapp, free web app, freebie, free, kit, dashboard, webapp, we bapp, starter kit, starter dashboard, starter admin, starter webapp, starter web app, tailwind, tailwindcss, html kit, nextjs kit, html dashboard, nextjs dashboard, html webapp, nextjs webapp html web app, nextjs web app, notus, notus webapp, notus nextjs, notus javascript, notus kit, notus dashboard, notus admin"
          />
          <meta
            name="description"
            content="Start your development with a Free Tailwind CSS and NextJS UI Kit and Admin. Let Notus NextJS amaze you with its cool features and build tools and get your project to a whole new level."
          />

          {/* Schema.org markup for Google+ */}
          <meta itemProp="name" content="Notus NextJS by Creative Tim" />
          <meta
            itemProp="description"
            content="Start your development with a Free Tailwind CSS and NextJS UI Kit and Admin. Let Notus NextJS amaze you with its cool features and build tools and get your project to a whole new level."
          />

          <meta
            itemProp="image"
            content="https://s3.amazonaws.com/creativetim_bucket/products/393/original/opt_notus_nextjs_thumbnail.jpg"
          />

          {/* Twitter Card data */}
          <meta name="twitter:card" content="product" />
          <meta name="twitter:site" content="@creativetim" />
          <meta name="twitter:title" content="Notus NextJS by Creative Tim" />

          <meta
            name="twitter:description"
            content="Start your development with a Free Tailwind CSS and NextJS UI Kit and Admin. Let Notus NextJS amaze you with its cool features and build tools and get your project to a whole new level."
          />
          <meta name="twitter:creator" content="@creativetim" />
          <meta
            name="twitter:image"
            content="https://s3.amazonaws.com/creativetim_bucket/products/393/original/opt_notus_nextjs_thumbnail.jpg"
          />

          {/* Open Graph data */}
          <meta property="fb:app_id" content="655968634437471" />
          <meta property="og:title" content="Notus NextJS by Creative Tim" />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content="http://demos.creative-tim.com/now-ui-dashboard-pro/examples/dashboard.html"
          />
          <meta
            property="og:image"
            content="https://s3.amazonaws.com/creativetim_bucket/products/393/original/opt_notus_nextjs_thumbnail.jpg"
          />
          <meta
            property="og:description"
            content="Start your development with a Free Tailwind CSS and NextJS UI Kit and Admin. Let Notus NextJS amaze you with its cool features and build tools and get your project to a whole new level."
          />
          <meta property="og:site_name" content="Creative Tim" />
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <link
            rel="shortcut icon"
            href={require('assets/img/brand/favicon.ico')}
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href={require('assets/img/brand/apple-icon.png')}
          />
        </Head>
        <body className="text-gray-800 antialiased">
          <div id="page-transition"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
