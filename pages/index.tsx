import React from 'react'
import { getGhostTags, getFeaturedPosts } from '../lib/posts'
import { generateAtomFeed } from '../lib/feed'
// import { generateEpub, generatePdf, generateJats } from '../lib/pandoc'
import { updateIndex, updateSchema } from '../lib/typesense'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import Tag from '../components/Tag'
// import Newsletter from '../components/Newsletter'

export async function getStaticProps() {
  const tags = await getGhostTags()
  const posts = await getFeaturedPosts()

  if (!posts || !tags) {
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
    props: { posts, tags }
  }
}

const IndexPage = ({ posts, tags }) => {
  const tag = {
    name: 'All Science needs Front Matter',
    description: 'Coming soon.',
    feature_image: '/img/hero.jpg',
    featured: true
  }

  return (
    <>
      <Header />
      <Hero tag={tag} />
      <Categories tags={tags} />
      <Tag posts={posts} />
      <Footer />
    </>
  )
}

export default IndexPage
