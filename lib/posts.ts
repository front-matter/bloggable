import GhostContentAPI from '@tryghost/content-api'

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
