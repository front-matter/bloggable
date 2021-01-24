import React from 'react'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

import { GetStaticPaths } from 'next'
import { getSinglePost } from '../../lib/posts'
import IndexNavbar from '../../components/Navbars/IndexNavbar.js'
import Footer from '../../components/Footers/Footer.js'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: '1' } }, { params: { slug: '2' } }],
    fallback: true
  }
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
      <IndexNavbar fixed />
      <div className="container px-4 py-16 mx-auto grid grid-rows-3 grid-flow-col gap-4">
        <section className="col-start-2 col-span-2">
          <div className="flex flex-col my-4 text-green-800">
            <Link href={`/posts/${props.post.slug}`}>
              <a className="text-2xl font-sans font-bold no-underline sm:text-4xl hover:underline">
                {props.post.title}
              </a>
            </Link>
          </div>
          <div className="text-lg font-serif">
            {ReactHtmlParser(props.post.html)}
          </div>
          <div className="flex flex-row pt-2">
            <img
              className="h-10 shadow rounded-full mr-2"
              src={props.post.primary_author.profile_image}
            />
            <div className="">
              <div className="font-bold uppercase text-sm">
                {props.post.primary_author.name}
              </div>
              <div className="uppercase text-sm text-gray-600">
                {new Date(props.post.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}{' '}
                &bull; {props.post.reading_time} min read
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default Post
