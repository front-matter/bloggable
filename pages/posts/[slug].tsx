import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'
import { parseISO } from 'date-fns'
import { BlogPosting } from 'schema-dts'
import { jsonLdScriptProps } from 'react-schemaorg'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Newsletter from '../../components/Newsletter'
import RecommendedPosts from '../../components/RecommendedPosts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCreativeCommons,
  faCreativeCommonsBy,
  faDiscord
} from '@fortawesome/free-brands-svg-icons'

import { GetStaticPaths } from 'next'
import {
  getAllPosts,
  getAllTags,
  getSinglePost,
  getSimilarIndexedPosts
} from '../../lib/posts'
import Byline from '../../components/Byline'
import { sanitizeDescription } from '../../lib/helpers'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts()
  const paths = posts.map((post) => ({
    params: { slug: post.slug }
  }))

  return { paths, fallback: true }
}

export async function getStaticProps(context) {
  const post = await getSinglePost(context.params.slug)

  // this needs to be loaded only at startup
  const tags = await getAllTags()

  if (!post) {
    return {
      props: { notFound: true }
    }
  }

  const recommendedPosts = await getSimilarIndexedPosts(
    post.title + ' ' + post.tags.map((tag) => tag.name).join(' '),
    post.canonical_url
  )
  return {
    props: { post, tags, recommendedPosts }
  }
}

const Post = (props) => {
  if (!props.post) return <div>Not found</div>

  const description = sanitizeDescription(props.post.html) + ''
  const doi = props.post.canonical_url

  return (
    <>
      <Head>
        <title>{props.post.title}</title>

        {doi && (
          <>
            <meta name="DC.identifier" content={doi} />
            <meta name="citation_doi" content={doi} />
          </>
        )}
        <meta
          name="DC.rights"
          content="https://creativecommons.org/licenses/by/4.0/legalcode"
        />
        <meta name="description" content={description} />

        <meta name="citation_title" content={props.post.title} />
        <meta name="citation_author" content={props.post.primary_author.name} />
        <meta
          name="citation_publication_date"
          content={parseISO(props.post.published_at).toLocaleDateString(
            'en-US'
          )}
        />
        <meta name="citation_journal_title" content="Front Matter" />
        <meta name="citation_language" content="en" />
        {props.post.tags.length > 0 && (
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
        <meta name="og:description" content={description} />
        {props.post.feature_image && (
          <meta name="og:image" content={props.post.feature_image} />
        )}
        <script
          type="application/ld+json"
          {...jsonLdScriptProps<BlogPosting>({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            '@id': doi,
            url: 'https://blog.front-matter.io/posts/' + props.post.slug,
            name: props.post.title,
            headline: props.post.title,
            description: description,
            author: {
              '@type': 'Person',
              '@id': props.post.primary_author.website,
              name: props.post.primary_author.name,
              image: props.post.primary_author.profile_image
                ? 'https:' + props.post.primary_author.profile_image
                : null
            },
            isPartOf: {
              '@type': 'Blog',
              name: 'Front Matter',
              issn: process.env.NEXT_PUBLIC_ISSN
            },
            publisher: { '@type': 'Organization', name: 'Front Matter' },
            keywords: props.post.tags.length > 0
              ? props.post.tags.map((tag) => tag.slug).join(', ')
              : null,
            inLanguage: 'en',
            license: 'https://creativecommons.org/licenses/by/4.0/legalcode',
            dateCreated: props.post.created_at.split('.')[0] + 'Z',
            dateModified: props.post.updated_at.split('.')[0] + 'Z',
            datePublished: props.post.published_at.split('.')[0] + 'Z'
          })}
        />
      </Head>
      <Header tags={[]} tag={{}} />
      <div className="md:container mx-6 md:mx-auto py-8 flex flex-wrap justify-center">
        <div className="w-full md:w-8/12 ">
          {props.post.feature_image && (
            <div className="flex-shrink-0 bg-white py-6">
              <img
                className="object-cover h-48 md:h-72 lg:h-96 w-full shadow-lg rounded-lg"
                src={props.post.feature_image}
                alt=""
              />
            </div>
          )}
          {props.post.tags && (
            <p className="font-medium uppercase font-sans mb-0 text-green-600">
              {props.post.tags.map((tag, index) => (
                <>
                  <Link
                    key={tag.slug}
                    href={'/?tag=' + tag.slug}
                    passHref
                  >
                    <a
                      href="dummy"
                      className="border-b-0 hover:border-b hover:border-green-600">
                      {tag.name}
                    </a>
                  </Link>
                  {index + 1 < props.post.tags.length ? ' · ' : ''}
                </>
              ))}
            </p>
          )}
          <h1 className="mt-0 mb-2 text-green-600">{props.post.title}</h1>
          <Byline
            authors={props.post.authors}
            published={parseISO(props.post.published_at)}
            readingTime={props.post.reading_time}
            doi={doi}
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
            {props.post.authors.map((author) => author.name).join(', ')}.
            Distributed under the terms of the{' '}
            <a
              className="border-b-0 hover:border-b hover:border-green-600"
              href="https://creativecommons.org/licenses/by/4.0/legalcode"
            >
              Creative Commons Attribution 4.0 License.
            </a>{' '}For comments or other feedback, join the{' '}
              <Link
                href="/discord"
                passHref
              >
                <a
                  href="dummy"
                  className="border-b border-bgreen-600 hover:border-green-800">
                  Front Matter              
                  <span className="text-lg text-gray-900 ml-1 mr-0.5">
                    <FontAwesomeIcon icon={faDiscord} />
                  </span>
                  Discord Server
                </a>
              </Link>.
          </div>
        </div>
      </div>
      {props.recommendedPosts.length > 0 && (
        <RecommendedPosts posts={props.recommendedPosts} />
      )}
      <Newsletter />
      <Footer />
    </>
  )
}

export default Post
