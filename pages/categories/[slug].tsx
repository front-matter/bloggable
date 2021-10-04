import React from 'react'
import { getPostsByTag, getAllTags, getSingleTag } from '../../lib/posts'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Hero from '../../components/Hero'
import Tag from '../../components/Tag'
import { GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getAllTags()
  const paths = tags.map((tag) => ({
    params: { slug: tag.slug }
  }))

  return { paths, fallback: true }
}

export async function getStaticProps(context) {
  const tag = await getSingleTag(context.params.slug)
  const tags = await getAllTags()
  const page = context.params.page || 1
  const posts = await getPostsByTag(context.params.slug, page)

  if (!posts || !tag) {
    return {
      props: { notFound: true }
    }
  }

  return {
    props: { posts, tags, tag, pagination: posts.meta.pagination }
  }
}

const CategoryPage = ({ posts, tags, tag, pagination }) => {
  return (
    <>
      <Header tags={tags} tag={tag} />
      <Hero tag={tag} />
      <Tag posts={posts} tag={tag} pagination={pagination} />
      <Footer />
    </>
  )
}

export default CategoryPage
