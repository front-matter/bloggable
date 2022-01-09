import React from 'react'
import Head from 'next/head'
import { jsonLdScriptProps } from 'react-schemaorg'
import { getAllTags } from '../lib/posts'
import { generateAtomFeed } from '../lib/feed'
// import { generateEpub, generatePdf, generateJats } from '../lib/pandoc'
import { refreshIndex } from '../lib/typesense'
// import { updateSchema } from '../lib/typesense'
import Header from '../components/Header'
import Footer from '../components/Footer'
// import Hero from '../components/Hero'
import Tag from '../components/Tag'
import Newsletter from '../components/Newsletter'
import { Blog } from 'schema-dts'
import { useQueryState } from 'next-usequerystate'

export async function getStaticProps() {
  // this needs to be loaded only at startup
  const tags = await getAllTags()
  
  await generateAtomFeed()
  // await generateEpub()
  // await generatePdf()
  // await generateJats()
  // await updateSchema()
  await refreshIndex()

  return {
    props: { tags }
  }
}

const IndexPage = ({ tags }) => {
  const [tagString] = useQueryState('tag')

  const tag = tags.find(({ slug }) => slug === tagString) || {
    name: 'Front Matter Blog',
    description: 'Where Open Science matters',
    feature_image: '/img/hero.jpg',
    slug: null
  }

  console.log(process.env.GIT_BRANCH)

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
        <div className="min-h-screen">
          <Tag tag={tag} />
        </div>
        {process.env.GIT_BRANCH === 'staging' && <Newsletter />}
        <Footer />
    </>
  )
}

export default IndexPage
