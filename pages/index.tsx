import React from 'react'
import Link from 'next/link'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  connectHits,
  connectStats,
  connectPagination
} from 'react-instantsearch-dom'

import { getPosts } from '../lib/posts'
import { pluralize } from '../lib/helpers'
import { generateAtomFeed } from '../lib/feed'
// import { generateEpub, generatePdf, generateJats } from '../lib/pandoc'
import { updateIndex } from '../lib/algolia'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Featured from '../components/Featured'
import Newsletter from '../components/Newsletter'

export async function getStaticProps(context) {
  const posts = await getPosts('featured', 6)

  if (!posts) {
    return {
      props: { notFound: true }
    }
  }

  await generateAtomFeed()
  // await generateEpub()
  // await generatePdf()
  // await generateJats()
  // await updateIndex()

  return {
    props: { posts }
  }
}

const IndexPage = ({ posts }) => {
  return (
    <>
      <Header />
      <Hero />
      <Featured posts={posts} />
      <Newsletter />
      <Footer />
    </>
  )
}

export default IndexPage

// <InstantSearch indexName="sensible-science" searchClient={searchClient}>
//   <Navbar searchBox={false} />
//   <div className="container mx-auto px-6 py-16 flex flex-wrap justify-center">
//     <div className="w-auto md:w-8/12">
//       <CustomStats />
//       <CustomHits />
//       <CustomPagination showFirst={false} />
//     </div>
//   </div>
// </InstantSearch>
// <Footer />
