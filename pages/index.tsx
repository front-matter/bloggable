import React from 'react'
import { getSingleGhostTag, getPostsByTag } from '../lib/posts'
import { generateAtomFeed } from '../lib/feed'
// import { generateEpub, generatePdf, generateJats } from '../lib/pandoc'
import { updateIndex, updateSchema } from '../lib/typesense'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Tag from '../components/Tag'
// import Newsletter from '../components/Newsletter'

export async function getStaticProps() {
  const tag = await getSingleGhostTag('featured')
  const posts = await getPostsByTag('featured', tag.count.posts)

  if (!posts || !tag) {
    return {
      props: { notFound: true }
    }
  }

  await generateAtomFeed()
  // await generateEpub()
  // await generatePdf()
  // await generateJats()
  // await updateSchema()
  // await updateIndex()

  return {
    props: { posts, tag }
  }
}

const IndexPage = ({ posts, tag }) => {
  return (
    <>
      <Header />
      <Hero tag={tag} />
      <Tag posts={posts} />
      <Footer />
    </>
  )
}

export default IndexPage
