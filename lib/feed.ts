import { Feed } from 'feed'
import { getPosts } from './posts'
const fs = require('fs')

export async function generateAtomFeed() {
  const feed = new Feed({
    title: 'Sensible Science',
    description:
      'Martin Fenner writes about how the internet is changing scholarly communication.',
    id: 'https://blog.sensiblescience.io/',
    link: 'https://blog.sensiblescience.io/',
    language: 'en',
    copyright:
      'Copyright © 2007-' +
      new Date().getFullYear() +
      ' Martin Fenner. Distributed under the terms of the Creative Commons Attribution 4.0 License.',
    feedLinks: {
      atom: 'https://blog.sensiblescience.io/feed.xml'
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
      link: 'https://blog.sensiblescience.io/posts/' + post.slug,
      description: post.excerpt,
      content: post.html,
      date: new Date(post.published_at)
    })
  })

  fs.writeFileSync('./public/feed.xml', feed.atom1())
}
