import React from 'react'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

import { getPosts } from '../lib/posts'
import IndexNavbar from '../components/Navbars/IndexNavbar.js'
import Footer from '../components/Footers/Footer.js'

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
      <IndexNavbar fixed />
      <section className="container px-4 py-16 mx-auto">
        {props.posts.map((post) => (
          <section className="mt-8">
            <h2>
              <Link href={`/posts/${post.slug}`}>
                <a className="text-2xl font-sans font-bold no-underline sm:text-4xl hover:underline">
                  {post.title}
                </a>
              </Link>
            </h2>
            <div className="text-xl leading-normal sm:text-2xl">
              <ReactMarkdown className="font-serif" plugins={[gfm]}>
                {post.excerpt}
              </ReactMarkdown>
            </div>
            <div className="flex flex-row pt-2">
              <img
                className="h-10 shadow rounded-full mr-2"
                src={post.primary_author.profile_image}
              />
              <div className="">
                <div className="font-bold uppercase text-sm">
                  {post.primary_author.name}
                </div>
                <div className="uppercase text-sm text-gray-600">
                  {new Date(post.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}{' '}
                  &bull; {post.reading_time} min read
                </div>
              </div>
            </div>
          </section>
        ))}
      </section>
      <Footer />
    </>
  )
}

export default IndexPage
