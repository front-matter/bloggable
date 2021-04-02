import React from 'react'
// import Link from 'next/link'
import Head from 'next/head'
// import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'
// import ReactMarkdown from 'react-markdown'
// import gfm from 'remark-gfm'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import { GetStaticPaths } from 'next'
import { getAllPosts, getSinglePost } from '../../lib/posts'
import IndexNavbar from '../../components/IndexNavbar.js'
// import Footer from '../../components/Footers/Footer.js'
import Byline from '../../components/Byline'
import DiscourseForum from '../../lib/discourse-forum.js'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts()
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

  return {
    props: { post }
  }
}

const Post = (props) => {
  if (!props.post) return <div>Not found</div>

  const hit = props.post.object

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

// <h2>Other Formats</h2>
// <div>
//   <span className="mr-4">
//     <a
//       className="font-sans border-b-0"
//       href={'/epub/' + hit.slug + '.epub'}
//     >
//       <i className="fas fa-book"></i> ePub
//     </a>
//   </span>
//   <span className="mr-4">
//     <a
//       className="font-sans border-b-0"
//       href={'/pdf/' + hit.slug + '.pdf'}
//     >
//       <i className="fas fa-file-pdf"></i> PDF
//     </a>
//   </span>
//   <span>
//     <a
//       className="font-sans border-b-0"
//       href={'/jats/' + hit.slug + '.xml'}
//     >
//       <i className="fas fa-file-code"></i> JATS
//     </a>
//   </span>
// </div>
