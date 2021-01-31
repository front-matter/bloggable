import { Feed } from 'feed'
import { getPosts } from './posts'
const fs = require('fs')

export async function generateRssFeed() {
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
      atom: 'https://blog.martinfenner.org/rss'
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
      id: post.uuid,
      link: 'https://blog.martinfenner.org/posts/' + post.slug,
      description: post.excerpt,
      content: post.html,
      date: new Date(post.published_at)
    })
  })

  fs.writeFileSync('./public/rss.xml', feed.rss2())
}
