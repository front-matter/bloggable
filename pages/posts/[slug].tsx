import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

import { GetStaticPaths } from 'next'
import { getPosts, getSinglePost } from '../../lib/posts'
import IndexNavbar from '../../components/Navbars/IndexNavbar.js'
import Footer from '../../components/Footers/Footer.js'
import Byline from '../../components/Byline'
import DiscourseForum from '../../lib/discourse-forum.js'

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

  // let result = await axios
  //   .post('http://localhost:4000', post.html, {
  //     headers: { 'Content-Type': 'text/html', Accept: 'text/html' }
  //   })
  //   .then(
  //     (response) => {
  //       return response.data
  //     },
  //     (error) => {
  //       console.log(error)
  //     }
  //   )

  // if (result !== undefined) {
  //   post.htmlout = result
  // } else {
  //   post.htmlout = post.html
  // }

  post.htmlout = post.html

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
          content={new Date(props.post.published_at).toLocaleDateString(
            'en-US'
          )}
        />
        <meta name="citation_journal_title" content="Gobbledygook" />
        <meta name="citation_language" content="en" />
        {props.post.primary_tag && (
          <meta
            name="citation_keywords"
            content={props.post.primary_tag.name}
          />
        )}
        <meta
          name="citation_pdf_url"
          content={
            'https://blog.sensiblescience.io/pdf/' + props.post.slug + '.pdf'
          }
        />

        <meta name="og:title" content={props.post.title} />
        <meta name="og:description" content={props.post.excerpt} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'BlogPosting',
            '@id': 'https://blog.sensiblescience.io/' + props.post.uuid,
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
            keywords: props.post.primary_tag
              ? props.post.primary_tag.name
              : null,
            inLanguage: 'en',
            license: 'https://creativecommons.org/licenses/by/4.0/legalcode',
            dateCreated: props.post.created_at,
            dateModified: props.post.updated_at,
            datePublished: props.post.published_at
          })}
        </script>
      </Head>
      <IndexNavbar fluid />
      <div className="container mx-4 md:mx-auto px-6 py-16 flex flex-wrap justify-center">
        <div className="w-full md:w-8/12 ">
          <div className="text-xs font-sans font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1">
            {props.post.primary_tag ? props.post.primary_tag.name : null}
          </div>
          <h1 className="mt-1">{props.post.title}</h1>
          <Byline
            author={{
              name: props.post.primary_author.name,
              imageUrl: props.post.primary_author.profile_image
            }}
            published={new Date(props.post.published_at)}
            readingTime={props.post.reading_time}
          />
          <div className="text-lg">{ReactHtmlParser(props.post.htmlout)}</div>
          <DiscourseForum slug={props.post.slug} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Post

// <h2>Other Formats</h2>
// <div>
//   <span className="mr-4">
//     <a
//       className="font-sans border-b-0"
//       href={'/epub/' + props.post.slug + '.epub'}
//     >
//       <i className="fas fa-book"></i> ePub
//     </a>
//   </span>
//   <span className="mr-4">
//     <a
//       className="font-sans border-b-0"
//       href={'/pdf/' + props.post.slug + '.pdf'}
//     >
//       <i className="fas fa-file-pdf"></i> PDF
//     </a>
//   </span>
//   <span>
//     <a
//       className="font-sans border-b-0"
//       href={'/jats/' + props.post.slug + '.xml'}
//     >
//       <i className="fas fa-file-code"></i> JATS
//     </a>
//   </span>
// </div>
