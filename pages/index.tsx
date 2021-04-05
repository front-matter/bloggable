import React from 'react'
import { getPosts } from '../lib/posts'
// import { generateAtomFeed } from '../lib/feed'
// import { generateEpub, generatePdf, generateJats } from '../lib/pandoc'
// import { updateIndex } from '../lib/typesense'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Featured from '../components/Featured'
// import Newsletter from '../components/Newsletter'

export async function getStaticProps(context) {
  const posts = await getPosts('featured', 6)

  if (!posts) {
    return {
      props: { notFound: true }
    }
  }

  // await generateAtomFeed()
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
      <Footer />
    </>
  )
}

export default IndexPage
