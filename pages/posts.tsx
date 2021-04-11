import React from 'react'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'
import {
  InstantSearch,
  connectHits,
  connectStats,
  connectPagination
} from 'react-instantsearch-dom'
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter'

import { getAllPosts } from '../lib/posts'
import { pluralize } from '../lib/helpers'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Byline from '../components/Byline'

export async function getStaticProps(context) {
  const posts = await getAllPosts()

  if (!posts) {
    return {
      props: { notFound: true }
    }
  }

  return {
    props: { posts }
  }
}

const PostsPage = ({ posts }) => {
  const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
    server: {
      apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY,
      nodes: [
        {
          host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_1,
          port: '443',
          protocol: 'https'
        }
      ]
    },
    additionalSearchParameters: {
      queryBy: 'tags,title,content'
    }
  })

  const searchClient = typesenseInstantsearchAdapter.searchClient

  const Hits = ({ hits }) => (
    <>
      {hits.map((hit) => (
        <div key={hit.id}>
          <h1>
            <p className="text-sm font-medium uppercase font-sans mb-0 text-green-600">
              {hit.tags[0]}
            </p>
            <Link href={`/mfenner/${hit.slug}`}>
              <a className="leading-tight border-b-0 font-sans text-green-600 no-underline">
                {hit.title}
              </a>
            </Link>
          </h1>
          <Byline
            author={{
              name: hit.author.name,
              imageUrl: hit.author.imageUrl
            }}
            published={new Date(hit.published * 1000)}
            readingTime={hit.readingTime}
          />
          <div className="text-lg leading-normal">
            {ReactHtmlParser(hit.description)}
          </div>
        </div>
      ))}
    </>
  )

  const CustomHits = connectHits(Hits)

  const Stats = ({ nbHits }) => (
    <div className="mt-4">
      <h1>{pluralize(nbHits, 'Post')}</h1>
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
    if (nbPages === 1) return null

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
      <InstantSearch indexName="sensible-science" searchClient={searchClient}>
        <Header searchBox={true} />
        <div className="container mx-auto px-6 py-2 flex flex-wrap justify-center">
          <div className="w-auto md:w-8/12">
            <CustomStats />
            <CustomHits />
            <CustomPagination showFirst={false} />
          </div>
        </div>
        <Footer />
      </InstantSearch>
    </>
  )
}

export default PostsPage
