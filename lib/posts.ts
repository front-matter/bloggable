import GhostContentAPI from '@tryghost/content-api'
import { id } from 'date-fns/locale'
import { Client } from 'typesense'

let client = new Client({
  nodes: [
    {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST_1,
      port: '443',
      protocol: 'https'
    }
  ],
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY,
  connectionTimeoutSeconds: 2
})

export async function getPosts(
  query: string,
  hitsPerPage?: number,
  page?: number
) {
  return await client
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

export async function getSimilarPosts(query: string, recordId: string) {
  return await client
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

export async function getPostsByTag(
  query: string,
  hitsPerPage?: number,
  page?: number
) {
  return await client
    .collections('front-matter')
    .documents()
    .search({
      q: query,
      query_by: 'tags',
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

export async function getAllPosts() {
  return await client
    .collections('front-matter')
    .documents()
    .search({ q: '*', per_page: 250, page: 1 })
    .then(({ hits }) => {
      return hits
    })
    .catch((err) => {
      console.error(err)
      return err
    })
}

export async function getSinglePost(id: string) {
  return await client
    .collections('front-matter')
    .documents(id)
    .retrieve()
    .then(function (data) {
      return data
    })
    .catch((err) => {
      console.error(err)
      return err
    })
}

export async function getSinglePostBySlug(slug: string) {
  return await client
    .collections('front-matter')
    .documents()
    .search({ q: slug, query_by: 'slug', per_page: 1, page: 1 })
    .then((document) => {
      return document
    })
    .catch((err) => {
      console.error(err)
      return err
    })
}

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: 'https://editor.front-matter.io',
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

export async function getGhostTags() {
  return await api.tags
    .browse({
      limit: 'all',
      include: 'count.posts'
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getSingleGhostTag(tagSlug) {
  return await api.tags
    .read({
      slug: tagSlug,
      include: 'count.posts'
    })
    .catch((err) => {
      console.error(err)
    })
}
