import React from 'react'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  connectHits,
  connectStats,
  connectPagination
} from 'react-instantsearch-dom'

import { getPosts } from '../lib/posts'
import { pluralize } from '../lib/helpers'
import { generateRssFeed } from '../lib/feed'
import { generateEpub } from '../lib/pandoc'
import { updateIndex } from '../lib/algolia'
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
  await generateEpub()
  await updateIndex()

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
              <a className="text-2xl leading-tight border-b-0 font-sans font-bold no-underline sm:text-4xl hover:underline">
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
                className="text-xs font-sans font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </>
  )

  const CustomHits = connectHits(Hits)

  const Stats = ({ nbHits }) => (
    <div className="mt-4">
      <h1>{pluralize(nbHits, 'Result')}</h1>
    </div>
  )

  const CustomStats = connectStats(Stats)

  const Pagination = ({
    currentRefinement,
    nbPages,
    refine,
    createURL,
    showFirst
  }) => {
    if (nbPages == 1) return null

    return (
      <div className="py-2 mt-4">
        <nav className="block">
          <ul className="flex pl-0 rounded list-none flex-wrap">
            {new Array(nbPages).fill(null).map((_, index) => {
              const page = index + 1

              return (
                <li key={index}>
                  <a
                    href={createURL(page)}
                    className="first:ml-0 text-base font-semibold flex w-8 h-8 mx-4 p-0 rounded-full items-center justify-center relative border-2 border-solid border-blue-600 text-blue-600"
                    onClick={(event) => {
                      event.preventDefault()
                      refine(page)
                    }}
                  >
                    {page}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    )
  }

  const CustomPagination = connectPagination(Pagination)

  return (
    <>
      <InstantSearch indexName="zeitgeber" searchClient={searchClient}>
        <IndexNavbar searchBox={true} />
        <div className="container mx-auto px-6 py-16 flex flex-wrap justify-center">
          <div className="w-auto md:w-8/12">
            <CustomStats />
            <CustomHits />
            <CustomPagination showFirst={false} />
          </div>
        </div>
      </InstantSearch>
      <Footer />
    </>
  )
}

export default IndexPage
