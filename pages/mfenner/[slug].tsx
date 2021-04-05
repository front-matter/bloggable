import React from 'react'
import Head from 'next/head'
import ReactHtmlParser from 'react-html-parser'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCreativeCommons,
  faCreativeCommonsBy
} from '@fortawesome/free-brands-svg-icons'

import { GetStaticPaths } from 'next'
import { getGhostPosts, getSinglePostBySlug } from '../../lib/posts'
import Byline from '../../components/Byline'
import DiscourseForum from '../../lib/discourse-forum.js'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getGhostPosts()
  const paths = posts.map((post) => ({
    params: { slug: post.slug }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  let post = await getSinglePostBySlug(context.params.slug)

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

  const hit = props.post.hits[0] && props.post.hits[0].document

  return (
    <>
      <Head>
        <title>{hit.title}</title>

        <meta name="citation_title" content={hit.title} />
        <meta name="citation_author" content={hit.author.name} />
        <meta
          name="citation_publication_date"
          content={new Date(hit.published).toLocaleDateString('en-US')}
        />
        <meta name="citation_journal_title" content="Gobbledygook" />
        <meta name="citation_language" content="en" />
        {hit._tags && (
          <meta name="citation_keywords" content={hit._tags.join(', ')} />
        )}
        <meta
          name="citation_pdf_url"
          content={'https://sensiblescience.io/pdf/' + hit.slug + '.pdf'}
        />

        <meta name="og:title" content={hit.title} />
        <meta name="og:description" content={hit.description} />
        <script type="application/ld+json">
          {JSON.stringify(hit.schemaOrg)}
        </script>
      </Head>
      <Header />
      <div className="container mx-4 md:mx-auto px-6 py-8 flex flex-wrap justify-center">
        <div className="w-full md:w-8/12 ">
          <h1 className="mt-1 mb-2 text-green-600">{hit.title}</h1>
          <Byline
            author={{
              name: hit.author.name,
              imageUrl: hit.author.imageUrl
            }}
            published={new Date(hit.published)}
            readingTime={hit.readingTime}
          />
          <div className="text-lg">{ReactHtmlParser(hit.content)}</div>
          <div
            className="text-base leading-snug text-gray-600 py-1 font-sans"
            data-cy="copyright"
          >
            <span className="text-lg text-gray-900 mr-1">
              <FontAwesomeIcon icon={faCreativeCommons} className="mr-0.5" />
              <FontAwesomeIcon icon={faCreativeCommonsBy} />
            </span>
            Copyright © {new Date(hit.published).getFullYear()}{' '}
            {hit.author.name}. Distributed under the terms of the{' '}
            <a
              className="border-b-0"
              href="https://creativecommons.org/licenses/by/4.0/legalcode"
            >
              Creative Commons Attribution 4.0 License.
            </a>
          </div>{' '}
          {hit._tags &&
            hit._tags.forEach((tag) => {
              tag
            })}
          <DiscourseForum post={hit} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Post
