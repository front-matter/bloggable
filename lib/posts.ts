import algoliasearch from 'algoliasearch'
import GhostContentAPI from '@tryghost/content-api'

const searchClient = algoliasearch(
  '8ZJ4A0DNVF',
  '3304411f3a45083f327fd2706d07c433'
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
      // return {
      //   title: obj['title'],
      //   slug: obj['slug'],
      //   author: obj['author'],
      //   description: obj['description'],
      //   content: obj['content'],
      //   readingTime: obj['readingTime'],
      //   _tags: obj['tags'],
      //   published: obj['published'],
      //   updated: obj['updated'],
      //   objectID: obj['objectID']
      // }
    })
    .catch((err) => {
      console.error(err)
      return err
    })
}

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: 'https://editor.sensiblescience.io',
  key: '0cd2662483cb6da8d6ee6047e6',
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
