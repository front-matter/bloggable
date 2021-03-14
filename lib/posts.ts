import algoliasearch from 'algoliasearch'
import GhostContentAPI from '@tryghost/content-api'

const searchClient = algoliasearch(
  '8ZJ4A0DNVF',
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
)
const index = searchClient.initIndex('sensible-science')

export async function getPosts(
  query: string,
  hitsPerPage?: number,
  page?: number
) {
  return await index
    .search(query, {
      hitsPerPage: hitsPerPage ? hitsPerPage : 25,
      page: page > 0 ? page - 1 : 0
    })
    .then(({ hits }) => {
      return hits
    })
    .catch((err) => {
      console.error(err)
      return err
    })
}

export async function getAllPosts() {
  return await index
    .search('', {
      hitsPerPage: 500,
      page: 0
    })
    .then(({ hits }) => {
      return hits
    })
    .catch((err) => {
      console.error(err)
      return err
    })
}

export async function getSinglePost(postSlug: string) {
  return await index
    .findObject((hit) => hit['slug'] === postSlug)
    .then((obj) => {
      return obj
    })
    .catch((err) => {
      console.error(err)
      return err
    })
}

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: 'https://editor.sensiblescience.io',
  key: process.env.NEXT_PUBLIC_GHOST_API_KEY,
  version: 'v3'
})

export async function getGhostPosts() {
  return await api.posts
    .browse({
      limit: 'all',
      include: 'tags,authors'
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getSingleGhostPost(postSlug) {
  return await api.posts
    .read({
      slug: postSlug,
      include: 'tags,authors'
    })
    .catch((err) => {
      console.error(err)
    })
}
