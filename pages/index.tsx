import React from 'react'
import { getAllTags, getFeaturedPosts } from '../lib/posts'
import { generateAtomFeed } from '../lib/feed'
// import { generateEpub, generatePdf, generateJats } from '../lib/pandoc'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Tag from '../components/Tag'
// import Newsletter from '../components/Newsletter'

export async function getStaticProps() {
  const tags = await getAllTags()
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

  return {
    props: { posts, tags }
  }
}

const IndexPage = ({ posts, tags }) => {
  const tag = {
    name: 'Front Matter Blog',
    description: 'Where Open Science matters',
    feature_image: '/img/hero.jpg',
    featured: true
  }

  return (
    <>
      <Header tags={tags} />
      <Hero tag={tag} />
      <Tag posts={posts} />
      <Footer />
    </>
  )
}

export default IndexPage
