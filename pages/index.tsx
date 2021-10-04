import React from 'react'
import { getAllTags, getFeaturedPosts } from '../lib/posts'
import { generateAtomFeed } from '../lib/feed'
// import { generateEpub, generatePdf, generateJats } from '../lib/pandoc'
import { refreshIndex } from '../lib/typesense'
// import { updateSchema } from '../lib/typesense'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Tag from '../components/Tag'

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
  // await updateSchema()
  await refreshIndex()

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

  const pagination = {
    page: 1,
    pages: 1,
    total: posts.length,
    prev: null,
    next: null
  }

  return (
    <>
      <Header tags={tags} tag={tag} />
      <Hero tag={tag} />
      <Tag posts={posts} tag={tag} pagination={pagination} />
      <Footer />
    </>
  )
}

export default IndexPage
