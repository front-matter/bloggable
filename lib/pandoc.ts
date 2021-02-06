import { getPosts } from './posts'
import nodePandoc from 'node-pandoc-promise'

export async function generateEpub() {
  const posts = await getPosts()

  posts.forEach((post) => {
    const src = post.html
    const args = ['-f', 'html', '-t', 'epub3', '-o', './public/' + post.slug + '.epub', '--standalone', '--data-dir', './']
    nodePandoc(src, args)
  })
}
