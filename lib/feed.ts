import { Feed } from 'feed'
import { getPosts } from './posts'
const fs = require('fs')

export async function generateAtomFeed() {
  const feed = new Feed({
    title: 'Gobbledygook',
    description:
      'Martin Fenner writes about how the internet is changing scholarly communication.',
    id: 'https://blog.martinfenner.org/',
    link: 'https://blog.martinfenner.org/',
    language: 'en',
    copyright:
      'Copyright © 2007-' +
      new Date().getFullYear() +
      ' Martin Fenner. Distributed under the terms of the Creative Commons Attribution 4.0 License.',
    feedLinks: {
      atom: 'https://blog.martinfenner.org/index.xml'
    },
    author: {
      name: 'Martin Fenner',
      email: 'mf@martinfenner.org'
    }
  })

  const posts = await getPosts()

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      author: [
        {
          name: post.primary_author.name,
          link: post.primary_author.website
        }
      ],
      id: post.uuid,
      link: 'https://blog.martinfenner.org/posts/' + post.slug,
      description: post.excerpt,
      content: post.html,
      date: new Date(post.published_at)
    })
  })

  fs.writeFileSync('./public/index.xml', feed.atom1())
}
