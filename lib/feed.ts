import { Feed } from 'feed'
import { getPosts } from './posts'
const fs = require('fs')

export async function generateAtomFeed() {
  const feed = new Feed({
    title: 'Front Matter',
    description: 'Front Matter is a science blogging platform.',
    id: 'https://front-matter.io/',
    link: 'https://front-matter.io/',
    language: 'en',
    copyright:
      'Copyright © 2021 Front Matter. Distributed under the terms of the Creative Commons Attribution 4.0 License.',
    feedLinks: {
      atom: 'https://front-matter.io/feed.xml'
    },
    author: {
      name: 'Martin Fenner',
      email: 'mf@martinfenner.org'
    }
  })

  const posts = await getPosts('')

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      author: [
        {
          name: post.author.name,
          link: post.author.id
        }
      ],
      id: post.objectID,
      link: 'https://front-matter.io/' + post.blog.id + '/' + post.slug,
      description: post.description,
      content: post.content,
      date: new Date(post.published)
    })
  })

  fs.writeFileSync('./public/feed.xml', feed.atom1())
}
