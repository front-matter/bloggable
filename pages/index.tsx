import React from 'react'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

import { getPosts } from '../lib/posts'
import IndexNavbar from '../components/Navbars/IndexNavbar.js'
import Footer from '../components/Footers/Footer.js'
import Byline from '../components/Byline'
import Post from './posts/[slug]'

export async function getStaticProps(context) {
  const posts = await getPosts()

  if (!posts) {
    return {
      props: { notFound: true }
    }
  }

  return {
    props: { posts }
  }
}

const IndexPage = (props) => {
  return (
    <>
      <IndexNavbar />
      <section className="container px-4 py-16 flex flex-wrap justify-center mx-auto">
        {props.posts.map((post) => (
          <div key={post.id} className="w-6/12 pr-4">
            <h1>
              <Link href={`/posts/${post.slug}`}>
                <a className="text-2xl border-b-0 font-sans font-bold no-underline sm:text-4xl hover:underline">
                  {post.title}
                </a>
              </Link>
            </h1>
            <Byline post={post} />
            <div className="text-lg leading-normal sm:text-2xl">
              <ReactMarkdown
                plugins={[gfm]}
                allowedTypes={['paragraph', 'text']}
                unwrapDisallowed={true}
              >
                {post.excerpt}
              </ReactMarkdown>
            </div>
            <div>
              {post.tags.map((tag) => (
                <span
                  key={tag.name}
                  className="text-lg font-bold py-1 pr-4 rounded text-indigo-600 bg-indigo-200 uppercase"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </>
  )
}

export default IndexPage
