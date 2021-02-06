import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import ReactHtmlParser from 'react-html-parser'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

import { GetStaticPaths } from 'next'
import { getPosts, getSinglePost } from '../../lib/posts'
import IndexNavbar from '../../components/Navbars/IndexNavbar.js'
import Footer from '../../components/Footers/Footer.js'
import Byline from '../../components/Byline'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts()
  const paths = posts.map((post) => ({
    params: { slug: post.slug }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  let post = await getSinglePost(context.params.slug)

  if (!post) {
    return {
      props: { notFound: true }
    }
  }

  return {
    props: { post }
  }
}

const Post = (props) => {
  if (!props.post) return <div>Not found</div>

  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name="og:title" content={props.post.title} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'BlogPosting',
            '@id': 'https://blog.martinfenner.org/' + props.post.uuid,
            url: props.post.url,
            name: props.post.title,
            headline: props.post.title,
            description: props.post.excerpt,
            author: {
              '@type': 'Person',
              '@id': props.post.primary_author.website,
              name: props.post.primary_author.name
            },
            publisher: { '@type': 'Organization', name: 'Gobbledygook' },
            keywords: props.post.ta,
            inLanguage: 'en',
            license: 'https://creativecommons.org/licenses/by/4.0/legalcode',
            dateCreated: props.post.created_at,
            dateModified: props.post.updated_at,
            datePublished: props.post.published_at
          })}
        </script>
      </Head>
      <IndexNavbar fluid />
      <div className="container mx-auto px-6 py-16 flex flex-wrap justify-center">
        <div className="w-auto md:w-8/12 ">
          <h1>{props.post.title}</h1>
          <Byline
            author={{
              name: props.post.primary_author.name,
              imageUrl: props.post.primary_author.profile_image
            }}
            published={new Date(props.post.published_at)}
            readingTime={props.post.reading_time}
          />
          <div className="text-lg">{ReactHtmlParser(props.post.html)}</div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Post
