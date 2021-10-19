import React from 'react'
import Head from 'next/head'
import { jsonLdScriptProps } from 'react-schemaorg'
import { getAllTags, getFeaturedPosts } from '../lib/posts'
import { generateAtomFeed } from '../lib/feed'
// import { generateEpub, generatePdf, generateJats } from '../lib/pandoc'
import { refreshIndex } from '../lib/typesense'
// import { updateSchema } from '../lib/typesense'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Tag from '../components/Tag'
import { Blog } from 'schema-dts'

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
      <Head>
        <script
          type="application/ld+json"
          {...jsonLdScriptProps<Blog>({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            url: 'https://blog.front-matter.io/',
            name: 'Front Matter',
            issn: process.env.NEXT_PUBLIC_ISSN,
            publisher: { '@type': 'Organization', name: 'Front Matter' },
            inLanguage: 'en',
            license: 'https://creativecommons.org/licenses/by/4.0/legalcode'
          })}
        />
      </Head>
      <Header tags={tags} tag={tag} />
      <Hero tag={tag} />
      <Tag posts={posts} tag={tag} pagination={pagination} />
      <Footer />
    </>
  )
}

export default IndexPage
