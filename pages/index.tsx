import React from 'react'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, connectHits, Stats } from 'react-instantsearch-dom'

import { getPosts } from '../lib/posts'
import { generateRssFeed } from '../lib/feed'
// import { updateIndex } from '../lib/algolia'
import IndexNavbar from '../components/Navbars/IndexNavbar.js'
import Footer from '../components/Footers/Footer.js'
import Byline from '../components/Byline'

export async function getStaticProps(context) {
  const posts = await getPosts()

  if (!posts) {
    return {
      props: { notFound: true }
    }
  }

  await generateRssFeed()
  // await updateIndex()

  return {
    props: { posts }
  }
}

const IndexPage = (props) => {
  const searchClient = algoliasearch(
    '8ZJ4A0DNVF',
    'e4232510cdb1da6514f8f278e1c1b852'
  )

  const Hits = ({ hits }) => (
    <>
      {hits.map((hit) => (
        <div key={hit.uuid}>
          <h1>
            <Link href={`/posts/${hit.slug}`}>
              <a className="text-2xl border-b-0 font-sans font-bold no-underline sm:text-4xl hover:underline">
                {hit.title}
              </a>
            </Link>
          </h1>
          <Byline
            author={{
              name: hit.author.name,
              imageUrl: hit.author.imageUrl
            }}
            published={new Date(hit.published)}
            readingTime={hit.readingTime}
          />
          <div className="text-lg leading-normal sm:text-2xl">
            {ReactHtmlParser(hit.description)}
          </div>
          <div>
            {hit._tags.map((tag) => (
              <span
                key={tag}
                className="text-lg font-bold py-1 pr-4 rounded text-indigo-600 bg-indigo-200 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </>
  )

  const Posts = connectHits(Hits)

  return (
    <>
      <InstantSearch indexName="zeitgeber" searchClient={searchClient}>
        <IndexNavbar searchBox={true} />
        <div className="container mx-auto px-6 py-16 flex flex-wrap justify-center">
          <div className="w-auto md:w-6/12">
            <div className="mt-4">
              <Stats />
            </div>
            <Posts />
          </div>
        </div>
      </InstantSearch>
      <Footer />
    </>
  )
}

export default IndexPage
