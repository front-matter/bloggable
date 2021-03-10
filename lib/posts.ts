import GhostContentAPI from '@tryghost/content-api'

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: 'https://editor.sensiblescience.io',
  key: '0cd2662483cb6da8d6ee6047e6',
  version: 'v3'
})

export async function getPosts() {
  return await api.posts
    .browse({
      limit: 'all',
      include: 'tags,authors'
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getSinglePost(postSlug) {
  return await api.posts
    .read({
      slug: postSlug,
      include: 'tags,authors'
    })
    .catch((err) => {
      console.error(err)
    })
}
