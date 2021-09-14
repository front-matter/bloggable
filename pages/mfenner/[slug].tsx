import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'
import { parseISO } from 'date-fns'
import SimilarPosts from '../../components/SimilarPosts'
import { uuid2base32 } from '../../lib/helpers'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCreativeCommons,
  faCreativeCommonsBy
} from '@fortawesome/free-brands-svg-icons'

import { GetStaticPaths } from 'next'
import { getAllPosts, getSinglePost } from '../../lib/posts'
import Byline from '../../components/Byline'
import DiscourseForum from '../../lib/discourse-forum.js'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts()
  const paths = posts.map((post) => ({
    params: { slug: post.slug }
  }))

  return { paths, fallback: true }
}

export async function getStaticProps(context) {
  const post = await getSinglePost(context.params.slug)

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

        <meta name="citation_title" content={props.post.title} />
        <meta name="citation_author" content={props.post.primary_author.name} />
        <meta
          name="citation_publication_date"
          content={parseISO(props.post.published_at).toLocaleDateString(
            'en-US'
          )}
        />
        <meta name="citation_journal_title" content="FronMatter" />
        <meta name="citation_language" content="en" />
        {props.post.tags && (
          <meta
            name="citation_keywords"
            content={props.post.tags.map((tag) => tag.slug).join(', ')}
          />
        )}
        <meta
          name="citation_pdf_url"
          content={
            'https://blog.front-matter.io/pdf/' + props.post.slug + '.pdf'
          }
        />

        <meta name="og:title" content={props.post.title} />
        <meta name="og:description" content={props.post.description} />
        <script type="application/ld+json">
          {JSON.stringify(props.post.schemaOrg)}
        </script>
      </Head>
      <Header />
      <div className="container mx-4 md:mx-auto px-6 py-8 flex flex-wrap justify-center">
        <div className="w-full md:w-8/12 ">
          {props.post.tags && (
            <p className="text-sm font-medium uppercase font-sans mb-0 text-green-600">
              {props.post.tags.map((tag, index) => (
                <>
                  <Link key={tag.slug} href={`/categories/${tag.slug}`}>
                    <span className="border-b-0 hover:border-b hover:border-green-600">
                      {tag.slug}
                    </span>
                  </Link>
                  {index + 1 < props.post.tags.length ? ' · ' : ''}
                </>
              ))}
            </p>
          )}
          <h1 className="mt-0 mb-2 text-green-600">{props.post.title}</h1>
          <Byline
            author={{
              id: props.post.primary_author.website,
              name: props.post.primary_author.name,
              imageUrl: props.post.primary_author.profile_image
            }}
            published={parseISO(props.post.published_at)}
            readingTime={props.post.reading_time}
          />
          <div className="text-lg">{ReactHtmlParser(props.post.html)}</div>
          <div
            className="text-base leading-snug text-gray-600 py-1 font-sans"
            data-cy="copyright"
          >
            <span className="text-lg text-gray-900 mr-1">
              <FontAwesomeIcon icon={faCreativeCommons} className="mr-0.5" />
              <FontAwesomeIcon icon={faCreativeCommonsBy} />
            </span>
            Copyright © {parseISO(props.post.published_at).getFullYear()}{' '}
            {props.post.primary_author.name}. Distributed under the terms of the{' '}
            <a
              className="border-b-0"
              href="https://creativecommons.org/licenses/by/4.0/legalcode"
            >
              Creative Commons Attribution 4.0 License.
            </a>
          </div>
          <DiscourseForum post={props.post} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Post
