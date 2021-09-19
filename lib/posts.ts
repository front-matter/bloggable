import GhostContentAPI from '@tryghost/content-api'
import { Client } from 'typesense'

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: 'https://editor.front-matter.io',
  key: process.env.NEXT_PUBLIC_GHOST_API_KEY,
  version: 'v4'
})

export async function getAllPosts() {
  return api.posts
    .browse({
      limit: 'all',
      include: 'tags,authors'
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getFeaturedPosts() {
  return api.posts
    .browse({
      filter: 'featured:true',
      limit: 15,
      include: 'tags,authors'
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getRecommendedPosts(tag, id) {
  const tagName = tag ? tag.slug : 'news'

  return api.posts
    .browse({
      filter: 'tag:' + tagName + '+id:-' + id,
      limit: 25,
      include: 'tags,authors'
    })
    .then((posts) => {
      const randomPosts = posts.sort(() => 0.5 - Math.random())
      return randomPosts.slice(0, 3)
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getPostsByTag(tag, limit) {
  return api.posts
    .browse({
      filter: 'tag:' + tag,
      limit: limit,
      include: 'tags,authors'
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getSinglePost(postSlug) {
  return api.posts
    .read({
      slug: postSlug,
      include: 'tags,authors'
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getAllTags() {
  return api.tags
    .browse({
      limit: 'all',
      include: 'count.posts',
      order: 'count.posts desc'
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getSingleTag(tagSlug) {
  return api.tags
    .read({
      slug: tagSlug,
      include: 'count.posts'
    })
    .catch((err) => {
      console.error(err)
    })
}

// Typesense integrations

const client = new Client({
  nearestNode: {
    host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_0,
    port: '443',
    protocol: 'https'
  },
  nodes: [
    {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_1,
      port: '443',
      protocol: 'https'
    },
    {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_2,
      port: '443',
      protocol: 'https'
    },
    {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_3,
      port: '443',
      protocol: 'https'
    }
  ],
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY,
  connectionTimeoutSeconds: 10,
  numRetries: 3,
  retryIntervalSeconds: 3
})

export async function getIndexedPosts(
  query: string,
  hitsPerPage?: number,
  page?: number
) {
  return client
    .collections('front-matter')
    .documents()
    .search({
      q: query,
      query_by: 'tags,title,content',
      per_page: hitsPerPage ? hitsPerPage : 25,
      page: page > 0 ? page : 1
    })
    .then(({ hits }) => {
      return hits
    })
    .catch((err) => {
      console.error(err)
      return err
    })
}

export async function getSimilarIndexedPosts(query: string, recordId: string) {
  return client
    .collections('front-matter')
    .documents()
    .search({
      q: query,
      query_by: 'title,content,tags',
      hidden_hits: recordId,
      per_page: 3,
      page: 1
    })
    .then(({ hits }) => {
      return hits
    })
    .catch((err) => {
      console.error(err)
      return err
    })
}
